from .models import Product, Recipe
from .serializers import ProductSerializer, RecipeSerializer

from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer 
	renderer_classes = [JSONRenderer]

class RecipeViewSet(viewsets.ModelViewSet):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer  
	renderer_classes = [JSONRenderer]