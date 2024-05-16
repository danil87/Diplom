from django_filters import rest_framework as filters

from .models import Maintenance

class MaintenanceFilter(filters.FilterSet):
    equipment = filters.BaseInFilter(field_name='equipment__serial_number')
    technician = filters.BaseInFilter(field_name='technician__id')

    class Meta:
        model = Maintenance
        fields = ['cost', 'technician', 'equipment', 'maintenance_date', 'maintenance_type']