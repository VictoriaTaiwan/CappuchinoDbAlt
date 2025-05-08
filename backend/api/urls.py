from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (ProductViewSet, 
                    RecipeViewSet, 
                    PublicProductViewSet,
                    RegistrationView, 
                    CookieTokenRefreshView, 
                    CookieTokenObtainPairView, 
                    LogoutView)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'public-products', PublicProductViewSet, basename='public-product')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationView.as_view(), name='auth_register'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
