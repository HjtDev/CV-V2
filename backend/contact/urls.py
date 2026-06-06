from django.urls import path
from . import views

urlpatterns = [
    path('contact/', views.send_message, name='contact-send'),
]
