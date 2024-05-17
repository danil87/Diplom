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


    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializerLogin(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ['username', 'password']


class UserSerializerLogout(serializers.ModelSerializer):    
    class Meta:
        model = User
