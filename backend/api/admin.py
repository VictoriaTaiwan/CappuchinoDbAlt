from django.contrib import admin
from django import forms
from .models import Product, Recipe

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories', 'unit_name', 'image_src')
    search_fields = ('name',)

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories', 'unit_name', 'instructions', 'ingredients')
    search_fields = ('name',)        

admin.site.register(Product, ProductAdmin)
admin.site.register(Recipe, RecipeAdmin)
