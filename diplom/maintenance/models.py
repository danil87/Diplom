from django.db import models
from equipment.models import Equipment
from user.models import User

# Create your models here.
class Maintenance(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    maintenance_date = models.DateField()
    maintenance_type = models.CharField(max_length=50)
    technician = models.ForeignKey(User, on_delete=models.CASCADE)
    cost = models.DecimalField(decimal_places=2, max_digits=10)
    notes = models.TextField()