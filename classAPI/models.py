from django.db import models
from django.contrib.auth.models import User

# Create your models here.





class courseAgenda(models.Model):
    userKey = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    courseKey = models.CharField(max_length=50)
    week = models.IntegerField(default=0)
    text = models.TextField()



class courseSubmissionText(models.Model):
    userKey = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    student = models.CharField(max_length=50)
    submission = models.CharField(max_length=50)
    course = models.CharField(max_length=50, default="none")
    text = models.TextField()
    date = models.DateField(auto_now_add=True)
