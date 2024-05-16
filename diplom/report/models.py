from django.db import models

from user.models import User
from equipment.models import Equipment

# Create your models here.
class Report(models.Model):
    report_date = models.DateTimeField()
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    report_text = models.TextField()