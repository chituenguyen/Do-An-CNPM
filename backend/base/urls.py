from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRouters, name='routes'),
    path('products/', views.getProducts, name="getProducts"),
    path('products/<str:pk>', views.getProduct, name="getProduct")
]
