from .models import Product, Recipe
from .serializers import ProductSerializer, RecipeSerializer, RegistrationSerializer
from .api_permission import ApiPermission
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, generics
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer 
	renderer_classes = [JSONRenderer]
	permission_classes = [ApiPermission, IsAuthenticated]	

class RecipeViewSet(viewsets.ModelViewSet):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer  
	renderer_classes = [JSONRenderer]
	permission_classes = [ApiPermission, IsAuthenticated]

class PublicProductViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]
    
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            refresh = response.data.get("refresh")

            response.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60  # 7 days
            )
        response.data.pop('refresh', None)    
        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refresh_token')
        if not refresh:
            return Response({'detail': 'No refresh token'}, status=401)

        try:
            token = RefreshToken(refresh)
            access_token = str(token.access_token)
            return Response({'access': access_token})
        except Exception:
            return Response({'detail': 'Invalid refresh token'}, status=401)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'Successfully logged out'})
        response.delete_cookie('refresh_token')

        return response                         