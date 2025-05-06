from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.TextField(max_length=100)
    calories = models.IntegerField(default=0)
    unit_name = models.TextField(blank=True, default='')
    image_src = models.TextField(blank=True, default='')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product_detail', args=[str(self.id)])

class Recipe(Product):
    instructions = models.TextField(blank=True, default='')
    ingredients = models.JSONField(blank=True, null=True, default=dict)
    
    def get_absolute_url(self):
        return reverse('recipe_detail', args=[str(self.id)])
