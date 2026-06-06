from django.db import models
from django.utils.translation import gettext_lazy as _


class Message(models.Model):
    name       = models.CharField(max_length=200, verbose_name=_('Name'))
    email      = models.EmailField(                verbose_name=_('Email'))
    message    = models.TextField(                 verbose_name=_('Message'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Received at'))
    is_read    = models.BooleanField(default=False,       verbose_name=_('Read'))

    class Meta:
        ordering            = ['-created_at']
        verbose_name        = _('Message')
        verbose_name_plural = _('Messages')

    def __str__(self):
        return f'{self.name} <{self.email}>'
