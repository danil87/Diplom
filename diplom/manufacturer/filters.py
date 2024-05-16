from django_filters import rest_framework as filters

from .models import Manufacturer

class ManufacturerFilter(filters.FilterSet):
    class Meta:
        model = Manufacturer
        fields = '__all__'