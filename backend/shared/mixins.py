import re


class GetDataMixin:
    _REDIS_UNSAFE = re.compile(r'[\x00\s]')

    @staticmethod
    def validate_string_secure(value: str, max_length: int = 200, redis: bool = False) -> bool:
        if not isinstance(value, str) or not value:
            return False
        if len(value) > max_length:
            return False
        if redis and GetDataMixin._REDIS_UNSAFE.search(value):
            return False
        return True

    @staticmethod
    def get_client_ip(request) -> str:
        forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if forwarded_for:
            return forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR', '0.0.0.0')

    @staticmethod
    def get_client_user_agent(request) -> str:
        return request.META.get('HTTP_USER_AGENT', 'unknown')
