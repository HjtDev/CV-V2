from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.projects_list, name='projects-list'),
    path('status/', views.site_status, name='site-status'),
]
