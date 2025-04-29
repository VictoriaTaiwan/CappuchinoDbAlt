from rest_framework import serializers
from api.models import Product, Recipe

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'calories', 'unit_name', 'image_src')

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('name', 'calories', 'unit_name', 'image_src', 'instructions', 'ingredients')        