from .models import Product, Recipe
from .serializers import ProductSerializer, RecipeSerializer, RegistrationSerializer
from .api_permission import ApiPermission
from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny

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
    
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer     