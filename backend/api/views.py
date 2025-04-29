from .models import Product, Recipe
from .serializers import ProductSerializer, RecipeSerializer

from rest_framework import viewsets

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer 

class RecipeViewSet(viewsets.ModelViewSet):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer  
