from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product, Recipe

class ProductTests(APITestCase):

    def test_get_product(self):
        product = Product.objects.create(name='Sugar', calories=100)
        url = reverse('product-detail', args=[product.id])
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], product.name)

    def test_update_product(self):
        product = Product.objects.create(name='Sugar', calories=100)
        url = reverse('product-detail', args=[product.id])
        data = {'name': 'White sugar', 'calories': 200}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'White sugar')
        self.assertEqual(response.data['calories'], 200)

    def test_create_product(self):
        url = reverse('product-list')
        data = {'name': 'Test Product', 'calories': 0}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.get().name, 'Test Product')    

    def test_delete_product(self):
        product = Product.objects.create(name='Product to Delete', calories=50)
        url = reverse('product-detail', args=[product.id])
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=product.id).exists())

class RecipeTests(APITestCase):             
    
    def test_get_recipe(self):
        recipe = Recipe.objects.create(name='Cake')
        url = reverse('recipe-detail', args=[recipe.id])
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], recipe.name)

    def test_update_recipe(self):
        recipe = Recipe.objects.create(name='Cake', calories=100)
        url = reverse('recipe-detail', args=[recipe.id])
        data = {'name': 'Chocolate cake', 'calories': 200}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.data['calories'], data['calories'])

    def test_create_recipe(self):
        url = reverse('recipe-list')
        ingredients= {
            "ingredients":[
                {"name":"Sugar", "note":"3 teaspoons"}
                ]
            }
        data = {
                'name': 'Test Recipe', 
                'calories': 0, 
                'instructions': 'Cook until tasty', 
                'ingredients':ingredients
                }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.get().name, 'Test Recipe')    

    def test_delete_recipe(self):
        recipe = Recipe.objects.create(name='Recipe to Delete')
        url = reverse('recipe-detail', args=[recipe.id])
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Recipe.objects.filter(id=recipe.id).exists())