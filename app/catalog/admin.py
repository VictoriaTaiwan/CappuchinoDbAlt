from django.contrib import admin
from .models import Product, Recipe

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories', 'unit_name', 'image_src')

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories', 'unit_name', 'image_src', 'instructions', 'ingredients')

admin.site.register(Product, ProductAdmin)
admin.site.register(Recipe, RecipeAdmin)
