from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

from .views import ProductViewSet, RecipeViewSet, PublicProductViewSet, RegistrationView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'public-products', PublicProductViewSet, basename='public-product')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationView.as_view(), name='auth_register'),
]
