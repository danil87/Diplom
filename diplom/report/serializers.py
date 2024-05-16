from rest_framework import serializers
from .models import Report

class ReportListSerializer(serializers.ModelSerializer):
    equipment = serializers.SlugRelatedField(
        read_only=True,
        slug_field='serial_number'
    )
    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='full_name'
    )

    class Meta: 
        model = Report
        fields = '__all__'

class ReportCreateOrUpdateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Report
        fields = '__all__'