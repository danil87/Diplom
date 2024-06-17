from rest_framework import serializers

from .models import Maintenance

class MaintenanceListSerializer(serializers.ModelSerializer):
    equipment = serializers.SlugRelatedField(
        read_only=True,
        slug_field='serial_number'
    )
    technician = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    ) 

    class Meta:
        model = Maintenance
        fields = '__all__'

class MaintenanceCreateOrUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'

