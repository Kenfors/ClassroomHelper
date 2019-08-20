
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    re_path(r'^', TemplateView.as_view(template_name="base.html"), name='app'),
]
