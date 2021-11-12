from django.core.checks import messages
from .serializers import *
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        token['email'] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': " User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfileUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def userUpdateProfile(request):
    data = request.data

    user = request.user

    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]

    user.save()
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user = request.user
    data = request.data
    orderItem = data['orderItem']
    address = data['shippingAdress']

    if orderItem and len(data) == 0:
        return Response({"detail": "No order item"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # create order
        order = Order.objects.create(
            user=user,
            payment_Method=data['paymentMethod'],
            shipping_Price=data['shippingPrice'],
            total_Price=data['totalPrice'],

        )
        # create shipping
        shipping = ShippingAddress.objects.create(
            order=order,
            address=address['address'],
            city=address['city'],
            country=address['country']
        )
        # order and orderItems relationship
        for i in orderItem:
            product = Product.objects.get(_id=i['product']['_id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['quantity'],
                price=i['product']['price'],
                image=product.image.url,
            )
        # update quantity
        product.count_Stock -= item.qty
        product.save()
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrder(request, pk):
    order = Order.objects.get(_id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usergetmyorder(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
