from django.db import models
from django.contrib.auth.models import User

# Create your models here.





class courseAgenda(models.Model):
    userKey = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    courseKey = models.CharField(max_length=50)
    text = models.TextField()


