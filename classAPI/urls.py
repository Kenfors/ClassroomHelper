from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', views.authenticateAPI, name='Authenticate'),
    path('agenda/save', views.saveAgenda, name='AgendaUpdate'),
    path('agenda/load', views.loadAgenda, name='AgendaLoad'),
    path('data/', views.courseData, name='CourseLog')
]
