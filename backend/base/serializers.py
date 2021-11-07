from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_name')
    is_Admin = serializers.SerializerMethodField('get_isAdmin')

    def get_name(self, obj):
        name = obj.first_name + " "+obj.last_name
        if name == " ":
            name = obj.email
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_Admin']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField('get_token')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_Admin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
