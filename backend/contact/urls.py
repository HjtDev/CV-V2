from django.urls import path
from .views import SendMessageView

urlpatterns = [
    path('contact/', SendMessageView.as_view(), name='contact-send'),
]
