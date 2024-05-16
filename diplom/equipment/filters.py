from django_filters import rest_framework as filters

from .models import Equipment, EquipmentAssignments

class EquipmentFilter(filters.FilterSet):
    manufacturer = filters.BaseInFilter(field_name='manufacturer__name')

    class Meta:
        model = Equipment
        fields = ['serial_number', 'manufacturer', 'location', 'type', 'date_purchased', 'status', 'warranty_expiration']

class EquipmentAssignmentFilter(filters.FilterSet):
    equipment = filters.BaseInFilter(field_name='equipment__serial_number')
    user = filters.BaseInFilter(field_name='user__id')

    class Meta:
        model = EquipmentAssignments
        fields = ['user', 'equipment', 'assignment_date', 'return_date']