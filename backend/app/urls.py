from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.cache import never_cache
from api import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('api.urls')),
    path('', never_cache(views.index))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
