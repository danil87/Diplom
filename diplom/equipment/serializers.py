from rest_framework import serializers
from .models import Equipment, EquipmentAssignments


class EquipmentListSerializer(serializers.ModelSerializer):
    manufacturer = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Equipment
        fields = '__all__'

class EquipmentCreateOrUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class EquipmentAssignmentsListSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='full_name'
    )
    equipment = serializers.SlugRelatedField(
        read_only=True,
        slug_field='serial_number'
    )

    class Meta:
        model = EquipmentAssignments
        fields = '__all__'

class EquipmentAssignmentsCreateOrUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentAssignments
        fields = '__all__'