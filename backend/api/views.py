"""
Views for the API - Proxy a tu API Flask existente.
"""
import requests
from django.http import JsonResponse
from django.views import View
from django.conf import settings

FLASK_API_URL = getattr(settings, 'FLASK_API_URL', 'http://localhost:5000/api/store')


class ProductsView(View):
    def get(self, request):
        try:
            params = request.GET.dict()
            response = requests.get(f"{FLASK_API_URL}/products", params=params, timeout=10)
            return JsonResponse(response.json())
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class CategoriesView(View):
    def get(self, request):
        try:
            response = requests.get(f"{FLASK_API_URL}/categories", timeout=10)
            return JsonResponse(response.json())
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
