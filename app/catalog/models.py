from django.db import models
from django.urls import reverse

class Product(models.Model):
    name = models.TextField()
    calories = models.IntegerField()
    unit_name = models.TextField()
    image_src = models.TextField()
    
    def get_absolute_url(self):
        return reverse('product_detail', args=[str(self.id)])

class Recipe(Product):
    instructions = models.TextField()
    ingredients = models.JSONField()
