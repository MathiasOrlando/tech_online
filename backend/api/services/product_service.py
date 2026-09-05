import os
import requests
from django.conf import settings


class ProductService:
    """
    Servicio para consumir productos desde tech_prod (API externa)
    y opcionalmente guardarlos en DB local.
    """
    
    def __init__(self):
        self.api_url = os.getenv('TECH_PROD_API_URL', 'http://localhost:5000')
        self.source = os.getenv('PRODUCT_SOURCE', 'api')
    
    def get_products(self):
        """
        Obtiene productos desde tech_prod API.
        Retorna lista de productos o None si hay error.
        """
        try:
            # Ruta correcta: /api/store/products
            response = requests.get(
                f"{self.api_url}/api/store/products",
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching products from tech_prod: {e}")
            return None
    
    def get_product_by_id(self, product_id):
        """
        Obtiene un producto específico desde tech_prod API.
        """
        try:
            # Ruta correcta: /api/store/products/{id}
            response = requests.get(
                f"{self.api_url}/api/store/products/{product_id}",
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching product {product_id}: {e}")
            return None
    
    def is_api_source(self):
        """Verifica si la fuente es API (frontend consume directo)"""
        return self.source == 'api'
    
    def is_db_source(self):
        """Verifica si la fuente es DB (backend hace proxy)"""
        return self.source == 'db'
