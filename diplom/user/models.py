from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    role = models.CharField(max_length=50)

    @property
    def full_name(self):
        return self.get_full_name()