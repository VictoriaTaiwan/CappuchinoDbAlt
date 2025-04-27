from django.db import models

class Product(models.Model):
    name = models.TextField()
    calories = models.IntegerField()
    unit_name = models.TextField()
    image_src = models.TextField()

class Recipe(Product):
    instructions = models.TextField()
    ingredients = models.JSONField()
