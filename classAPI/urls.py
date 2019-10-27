from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', views.authenticateAPI, name='Authenticate'),
    path('agenda/save', views.saveAgenda, name='AgendaUpdate'),
    path('agenda/load', views.loadAgenda, name='AgendaLoad'),
    path('submission/save', views.saveSubmissionText, name='AgendaUpdate'),
    path('submission/load', views.loadSubmissionText, name='AgendaLoad'),
    path('data/', views.courseData, name='CourseLog'),
    path('summary', views.listPosts, name='Summary'),

]
