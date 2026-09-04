import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import ProductService


product_service = ProductService()


@api_view(['GET'])
def get_products(request):
    """
    Obtiene productos desde tech_prod API.
    
    Si PRODUCT_SOURCE='db': hace proxy y guarda en DB local.
    Si PRODUCT_SOURCE='api': retorna error 400 (frontend debe consumir directo).
    """
    # Verificar configuración
    if product_service.is_api_source():
        return Response(
            {'error': 'PRODUCT_SOURCE=api: frontend debe consumir tech_prod directamente'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # PRODUCT_SOURCE='db': hacer proxy
    products = product_service.get_products()
    
    if products is None:
        return Response(
            {'error': 'No se pudo conectar con tech_prod API'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    
    return Response({'products': products}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product_detail(request, product_id):
    """
    Obtiene detalle de un producto desde tech_prod API.
    """
    if product_service.is_api_source():
        return Response(
            {'error': 'PRODUCT_SOURCE=api: frontend debe consumir tech_prod directamente'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    product = product_service.get_product_by_id(product_id)
    
    if product is None:
        return Response(
            {'error': f'Producto {product_id} no encontrado'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    return Response({'product': product}, status=status.HTTP_200_OK)
