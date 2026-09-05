import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from decouple import config
import requests


@api_view(['GET'])
def get_products(request):
    """
    Obtiene productos desde tech_prod API.
    
    Si PRODUCT_SOURCE='db': hace proxy y guarda en DB local.
    Si PRODUCT_SOURCE='api': retorna error 400 (frontend debe consumir directo).
    """
    # Verificar configuración
    product_source = config('PRODUCT_SOURCE', default='api')
    
    if product_source == 'api':
        return Response(
            {'error': 'PRODUCT_SOURCE=api: frontend debe consumir tech_prod directamente'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # PRODUCT_SOURCE='db': hacer proxy a tech_prod
    tech_prod_url = config('TECH_PROD_API_URL', default='http://localhost:5000')
    
    try:
        response = requests.get(
            f"{tech_prod_url}/api/store/products",
            timeout=10
        )
        response.raise_for_status()
        products = response.json()
        
        # Retornar productos (en el futuro guardar en DB)
        return Response({'products': products}, status=status.HTTP_200_OK)
        
    except requests.RequestException as e:
        print(f"Error fetching products from tech_prod: {e}")
        return Response(
            {'error': 'No se pudo conectar con tech_prod API'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


@api_view(['GET'])
def get_product_detail(request, product_id):
    """
    Obtiene detalle de un producto desde tech_prod API.
    """
    product_source = config('PRODUCT_SOURCE', default='api')
    
    if product_source == 'api':
        return Response(
            {'error': 'PRODUCT_SOURCE=api: frontend debe consumir tech_prod directamente'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    tech_prod_url = config('TECH_PROD_API_URL', default='http://localhost:5000')
    
    try:
        response = requests.get(
            f"{tech_prod_url}/api/store/products/{product_id}",
            timeout=10
        )
        response.raise_for_status()
        product = response.json()
        
        return Response({'product': product}, status=status.HTTP_200_OK)
        
    except requests.RequestException as e:
        print(f"Error fetching product {product_id}: {e}")
        return Response(
            {'error': f'Producto {product_id} no encontrado'},
            status=status.HTTP_404_NOT_FOUND
        )
