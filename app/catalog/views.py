from django.shortcuts import render
from .models import Product, Recipe
from django.views import generic
from django.shortcuts import get_object_or_404

def index(request):
    """View function for home page of site."""

    # Generate counts of some of the main objects
    num_products = Product.objects.all().count()

    # The 'all()' is implied by default.
    num_recipes = Recipe.objects.count()

    context = {
        'num_products': num_products,
        'num_recipes': num_recipes,
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)

class ProductListView(generic.ListView):
    model = Product
    context_object_name = 'products_list'

class ProductDetailView(generic.DetailView):
    model = Product
    
    def book_detail_view(request, primary_key):
        product = get_object_or_404(Product, pk=primary_key)
        return render(request, 'catalog/product_detail.html', context={'product': product})
