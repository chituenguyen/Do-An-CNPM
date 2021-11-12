from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import SET_NULL
from django.db.models.fields import AutoField
from django.utils import tree

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    count_Stock = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    create_At = models.DateField(auto_now_add=True)
    num_Reviews = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(
        Product, blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, blank=True, null=True)
    rating = models.IntegerField(
        null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)
    payment_Method = models.CharField(max_length=200, blank=True, null=True)
    tax_Price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    shipping_Price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    total_Price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    is_Paid = models.BooleanField(default=False)
    paid_At = models.DateField(auto_now_add=False, null=True, blank=True)
    is_Deliveried = models.BooleanField(default=False)
    delivered_At = models.DateField(auto_now_add=False, null=True, blank=True)
    create_At = models.DateField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.create_At)


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, blank=True, null=True, on_delete=models.SET_NULL)
    order = models.ForeignKey(
        Order, blank=True, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, blank=True, null=True, on_delete=models.CASCADE)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
