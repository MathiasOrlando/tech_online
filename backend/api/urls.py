"""
URL configuration for api app.
"""
from django.urls import path
from .views import ProductsView, CategoriesView

urlpatterns = [
    path('store/products', ProductsView.as_view(), name='products'),
    path('store/categories', CategoriesView.as_view(), name='categories'),
]
