from django.db import models
from django.utils.translation import gettext_lazy as _
import logging

logger = logging.getLogger(__name__)


def _bust(prefix: str) -> None:
    """Invalidate all cache keys for the given view prefix. Safe to call during migrations."""
    try:
        from shared.cache import invalidate_cache
        invalidate_cache(prefix)
    except Exception as exc:
        logger.warning('Cache invalidation skipped for %s: %s', prefix, exc)


class Project(models.Model):
    class Status(models.TextChoices):
        ACTIVE      = 'active',      _('Active')
        IN_PROGRESS = 'in_progress', _('In Progress')
        ARCHIVED    = 'archived',    _('Archived')

    # English content
    name        = models.CharField(max_length=200, verbose_name=_('Name'))
    description = models.TextField(                verbose_name=_('Description'))
    url         = models.URLField(blank=True,       verbose_name=_('Live URL'))
    github_url  = models.URLField(blank=True,       verbose_name=_('GitHub URL'))

    # Farsi content
    name_fa        = models.CharField(max_length=200, blank=True, verbose_name=_('Name (FA)'))
    description_fa = models.TextField(blank=True,                  verbose_name=_('Description (FA)'))

    # Shared
    tags       = models.JSONField(default=list,  verbose_name=_('Tags'), help_text=_('e.g. ["Next.js", "Django"]'))
    status     = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE, verbose_name=_('Status'))
    order      = models.PositiveSmallIntegerField(default=0, verbose_name=_('Order'), help_text=_('Lower = shown first'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created'))
    updated_at = models.DateTimeField(auto_now=True,     verbose_name=_('Updated'))

    class Meta:
        ordering            = ['order', '-created_at']
        verbose_name        = _('Project')
        verbose_name_plural = _('Projects')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        _bust('projects_list')

    def delete(self, *args, **kwargs):
        result = super().delete(*args, **kwargs)
        _bust('projects_list')
        return result


class SiteStatus(models.Model):
    is_available   = models.BooleanField(default=True,                    verbose_name=_('Available for work'))
    status_text    = models.CharField(max_length=100, default='Available for work', verbose_name=_('Status text'))
    status_text_fa = models.CharField(max_length=100, default='آماده همکاری',        verbose_name=_('Status text (FA)'))
    updated_at     = models.DateTimeField(auto_now=True, verbose_name=_('Updated'))

    class Meta:
        verbose_name        = _('Site Status')
        verbose_name_plural = _('Site Status')

    def __str__(self):
        return '✓ Available' if self.is_available else '✗ Unavailable'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
        _bust('site_status')

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
