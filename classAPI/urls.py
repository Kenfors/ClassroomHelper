from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', views.authenticateAPI, name='Authenticate'),
    path('data/', views.courseData, name='CourseLog')
]
