# Arquitectura tech_online

## Visió´´ın general

`tech_online` es un e-commerce que puede funcionar en dos modos:

1. **Modo API**: Productos desde `tech_prod` (API externa)
2. **Modo DB**: Productos desde base de datos local (con proxy Django)

## Diagrama de arquitectura

### Modo API (PRODUCT_SOURCE=api)

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   Frontend  │────▶│  tech_prod:5000 │     │   Django    │
│   (React)   │     │   (productos)   │     │   :8000     │
│   :5173     │     └─────────────────┘     │   (carrito) │
└─────────────┘                             └─────────────┘
       │                                            │
       └────────────────────────────────────────────┘
```

### Modo DB (PRODUCT_SOURCE=db)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   Frontend  │────▶│   Django    │────▶│  tech_prod:5000 │
│   (React)   │     │   :8000     │     │   (productos)   │
└─────────────┘     └─────────────┘     └─────────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ PostgreSQL  │
                   │  (DB local) │
                   └─────────────┘
```

## Configuració´´ın

### Backend (.env)

```env
# API de tech_prod (productos)
TECH_PROD_API_URL=http://localhost:5000

# Fuente de productos: 'api' o 'db'
PRODUCT_SOURCE=api
```

### Frontend (.env)

```env
# Fuente de productos: 'api' (tech_prod) o 'db' (Django)
VITE_PRODUCT_SOURCE=api

# URL de tech_prod API
VITE_TECH_PROD_API_URL=http://localhost:5000

# URL del backend Django
VITE_DJANGO_API_URL=http://localhost:8000
```

## Endpoints

### Backend Django

| Método | Endpoint | Descripció´´ın |
|--------|----------|----------------|
| GET | `/api/products/` | Lista productos (solo si PRODUCT_SOURCE=db) |
| GET | `/api/products/<id>/` | Detalle de producto (solo si PRODUCT_SOURCE=db) |

### Frontend

El frontend usa `productService.js` que automáticamente elige la URL según `VITE_PRODUCT_SOURCE`.

## Estructura de archivos

```
tech_online/
├── backend/
│   ├── api/
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── product_service.py    # Proxy a tech_prod
│   │   ├── views.py                  # Endpoints /api/products
│   │   └── urls.py
│   └── store_api/
│       ├── settings.py
│       └── urls.py
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── productService.js     # Servicio configurable
│   │   └── hooks/
│   │       ├── useCart.js
│   │       └── useProducts.js        # Hook para productos
│   ├── .env.example
│   └── CONFIG.md
├── .env.example
└── ARQUITECTURA.md
```

## Flujo de datos

### Cuando PRODUCT_SOURCE=api

1. Frontend llama a `getProducts()` en `productService.js`
2. `getBaseUrl()` retorna `http://localhost:5000`
3. Fetch a `http://localhost:5000/api/products`
4. Backend Django NO interviene en productos

### Cuando PRODUCT_SOURCE=db

1. Frontend llama a `getProducts()` en `productService.js`
2. `getBaseUrl()` retorna `http://localhost:8000`
3. Fetch a `http://localhost:8000/api/products`
4. Django `ProductService` hace fetch a `http://localhost:5000/api/products`
5. Django guarda en DB local y retorna al frontend

## Decisiones de diseño

### Por qué dos modos?

- **Modo API**: Más simple, menos infraestructura, ideal para desarrollo
- **Modo DB**: Más control, caching, transformació´´ın de datos, ideal para producció´´ın

### Por qué no siempre DB?

- Evita duplicació´´ın de datos innecesaria
- Menos latencia en desarrollo
- Menos complejidad si no se necesita caching

## Pró́ximos pasos

1. Implementar models de Producto en Django (si PRODUCT_SOURCE=db)
2. Agregar CORS en tech_prod para permitir frontend
3. Configurar nginx reverse proxy para producció´´ın
4. Implementar autenticació´´ın JWT
