from django.db import models
from user.models import User
from manufacturer.models import Manufacturer

class Equipment(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, null=True, default=None)
    model = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    date_purchased = models.DateField()
    warranty_expiration = models.DateField()

class EquipmentAssignments(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment_date = models.DateField()
    return_date = models.DateField()