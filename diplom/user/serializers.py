from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'role']

class UserSerializerRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_superuser', 'username', 'first_name', 'last_name', 'email', 'role', 'password']