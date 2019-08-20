from django.db import models
from django.contrib.auth.models import User

# Create your models here.




class logEntry(models.Model):
    models.ForeignKey(User, on_delete=models.DO_NOTHING)
    
