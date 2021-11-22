from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRouters, name='routes'),
    path('products/', views.getProducts, name="getProducts"),
    path('products/<str:pk>', views.getProduct, name="getProduct"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('userProfile/', views.getUserProfile, name="user-Profile"),
    path('users/', views.getUsers, name="getUsers"),
    path('register/', views.registerUser, name="register-User"),
    path('profile/', views.getUserProfile, name="profile-User"),
    path('update-Profile/', views.userUpdateProfile, name="UserUpdateProfile"),
    path('order/', views.addOrder, name="addOrder"),
    path('adminlistorder/', views.getOrders, name="adminlistorder"),
    path('usergetorder/<str:pk>', views.getOrder, name="usergetorder"),
    path('usergetlistorder', views.usergetmyorder, name="usergetmyorder"),
    path('usergetorder/<str:pk>/pay', views.updateOrderToPaid, name="order-paid"),
    path('admindeleteproduct/<str:pk>',
         views.AdminDeleteProduct, name="AdminDeleteProduct"),
    path('admincreatenewproduct', views.AdminCreateNewProduct,
         name="adminCreateNewProduct"),
    path('adminupdateproduct/<str:pk>',
         views.AdminUpdateProduct, name="AdminUpdateProduct"),

    path('adminupload', views.uploadImage, name="uploadImage"),
    path('adminupdatedelivered/<int:pk>', views.updateOrderToDelivered,
         name="update-Delivered")
]
