from django.shortcuts import render
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view(['GET'])
def getRouters(request):
    routers = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
        '/api/user/profile/',
    ]
    return Response(routers)


@api_view(['GET'])
def getProducts(request):
    return Response(products)


@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)
