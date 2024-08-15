from django.urls import path
from .views import create_provenance, get_provenance

urlpatterns = [
    path('create_prov/', create_provenance, name='create_provenance'),
    path('get_prov/<str:document_id>/', get_provenance, name='get_provenance'),
]
