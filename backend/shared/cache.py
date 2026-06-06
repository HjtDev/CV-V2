from collections.abc import Iterable
from functools import wraps
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .mixins import GetDataMixin
from json import dumps as convert_payload_to_string
from django.core.cache import cache
from copy import deepcopy
import hashlib
import logging

logger = logging.getLogger(__name__)


def _validate_cache_options(
        ttl: int,
        cache_prefix: str = None,
        user_aware: bool = True,
        response_codes: Iterable[int] = None,
        cache_headers: bool = False
):
    if not isinstance(ttl, int):
        raise TypeError('TTL must be an integer')
    if ttl <= 0:
        raise ValueError('TTL must be a positive integer')
    if cache_prefix is not None and not GetDataMixin.validate_string_secure(
            cache_prefix, max_length=200, redis=True
    ):
        raise ValidationError('cache_prefix cannot be used as a Redis key prefix')
    if not isinstance(user_aware, bool):
        raise TypeError('user_aware must be a boolean')
    if not isinstance(cache_headers, bool):
        raise TypeError('cache_headers must be a boolean')
    if response_codes is not None and (
            not isinstance(response_codes, Iterable)
            or not all(isinstance(code, int) for code in response_codes)
    ):
        raise TypeError('response_codes must be an iterable of integers')


def _extract_user_metadata(request):
    ip_address = GetDataMixin.get_client_ip(request)
    client = GetDataMixin.get_client_user_agent(request)
    return {'ip_address': ip_address, 'client': client}


def _generate_cache_prefix(view):
    qualname_parts = view.__qualname__.split('.')
    if len(qualname_parts) >= 2:
        return f"{qualname_parts[0]}_{qualname_parts[1]}"
    return view.__name__


def _get_user_identifier(request):
    return (
        request.user.id if request.user.is_authenticated
        else _extract_user_metadata(request)
    )


def _get_user_cache_tracking_key(user_identifier, cache_prefix):
    user_hash = hashlib.sha256(
        convert_payload_to_string(user_identifier, sort_keys=True, default=str).encode()
    ).hexdigest()
    return f'user_cache_tracking:{user_hash}:{cache_prefix}'


def drf_cached_response(
        ttl: int,
        cache_prefix: str = None,
        user_aware: bool = True,
        response_codes: Iterable[int] = None,
        cache_headers: bool = False
):
    """
    Caches DRF view responses in Redis.

    Usage (function-based views with @api_view):
        @api_view(['GET'])
        @drf_cached_response(ttl=300, cache_prefix='projects_list')
        def my_view(request):
            return Response(data)

    Cache invalidation:
        invalidate_cache('projects_list')             # all users
        invalidate_cache('projects_list', request)    # specific user
    """
    def decorator(view):
        nonlocal cache_prefix
        if cache_prefix is None:
            cache_prefix = _generate_cache_prefix(view)
            logger.info(f'Auto-generated cache prefix: {cache_prefix}')

        _validate_cache_options(ttl, cache_prefix, user_aware, response_codes, cache_headers)

        @wraps(view)
        def wrapper(request, *args, **kwargs):
            if hasattr(request, 'FILES') and request.FILES:
                logger.warning(f'Skipped caching for {view.__qualname__}: request contains files')
                return view(request, *args, **kwargs)

            res_codes = response_codes or [200]

            payload = {
                'view': view.__qualname__,
                'path': request.path,
                'method': request.method,
                'data': request.query_params if request.method == 'GET' else request.data,
            }

            user_identifier = None
            if user_aware:
                user_identifier = _get_user_identifier(request)
                payload['user'] = user_identifier

            if cache_headers:
                payload['headers'] = {
                    'Accept-Language': request.META.get('HTTP_ACCEPT_LANGUAGE'),
                    'Accept': request.META.get('HTTP_ACCEPT'),
                }

            raw_key = convert_payload_to_string(payload, sort_keys=True, default=str)
            key_hash = hashlib.sha256(raw_key.encode()).hexdigest()
            cache_key = f'{cache_prefix}_drf_cache_{key_hash}'

            cached_response = cache.get(cache_key)

            if cached_response is not None:
                logger.info(f'Cache HIT: {cache_key[:50]}... for {view.__qualname__}')
                cached_data = deepcopy(cached_response['data'])
                if isinstance(cached_data, dict):
                    cached_data['restored_from_cache'] = True
                return Response(data=cached_data, status=cached_response['status'])

            logger.info(f'Cache MISS: {cache_key[:50]}... for {view.__qualname__}')

            response = view(request, *args, **kwargs)

            if response.status_code not in res_codes:
                return response

            data = deepcopy(response.data)
            if isinstance(data, dict):
                data['restored_from_cache'] = False
            else:
                logger.warning('Response data is not a dict; cache flag could not be appended')

            cache.set(cache_key, {'data': data, 'status': response.status_code}, timeout=ttl)
            logger.info(f'Cached response for {cache_key[:50]}... (TTL: {ttl}s)')

            if user_aware and user_identifier is not None:
                tracking_key = _get_user_cache_tracking_key(user_identifier, cache_prefix)
                tracked_keys = cache.get(tracking_key, set())
                if not isinstance(tracked_keys, set):
                    tracked_keys = set()
                tracked_keys.add(cache_key)
                cache.set(tracking_key, tracked_keys, timeout=ttl)

            return Response(data=data, status=response.status_code)

        return wrapper
    return decorator


def invalidate_cache(cache_prefix: str, request=None) -> int:
    """
    Invalidates cache entries for a given prefix.

    Args:
        cache_prefix: The prefix used in @drf_cached_response
        request: Optional — pass for user-specific invalidation only

    Returns:
        Number of keys deleted
    """
    try:
        if request is None:
            deleted = cache.delete_pattern(f'{cache_prefix}_drf_cache_*')
            cache.delete_pattern(f'user_cache_tracking:*:{cache_prefix}')
            logger.info(f'Invalidated {deleted} cache keys globally for prefix: {cache_prefix}')
        else:
            user_identifier = _get_user_identifier(request)
            tracking_key = _get_user_cache_tracking_key(user_identifier, cache_prefix)
            tracked_keys = cache.get(tracking_key, set())
            if not tracked_keys:
                return 0
            deleted = sum(1 for k in tracked_keys if cache.delete(k))
            cache.delete(tracking_key)
            logger.info(f'Invalidated {deleted} cache keys for user in prefix: {cache_prefix}')
        return deleted
    except AttributeError:
        logger.warning(
            'Cache backend does not support delete_pattern. '
            'Use django-redis for global invalidation or provide request for user-specific.'
        )
        return 0
