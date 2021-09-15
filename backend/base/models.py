from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import SET_NULL

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
    # image
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
