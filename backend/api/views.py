from .models import Product, Recipe
from .serializers import ProductSerializer, RecipeSerializer

from rest_framework import viewsets
from django.shortcuts import render


def index(request):
    num_products = Product.objects.all().count()
    num_recipes = Recipe.objects.count()
    context = {
    'num_products': num_products,
    'num_recipes': num_recipes,
    }
    return render(request, 'index.html', context=context)

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer 

class RecipeViewSet(viewsets.ModelViewSet):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer  
