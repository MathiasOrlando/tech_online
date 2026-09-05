# Configuració´´ın del Frontend

## Variables de entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

## Configuració´´ın según fuente de productos

### Opció´´ın 1: Productos desde tech_prod (API directa)

```env
VITE_PRODUCT_SOURCE=api
VITE_TECH_PROD_API_URL=http://localhost:5000
VITE_DJANGO_API_URL=http://localhost:8000
```

**Flujo:**
```
Frontend → http://localhost:5000/api/products (tech_prod)
Frontend → http://localhost:8000/api/cart (Django - carritos)
```

### Opció´´ın 2: Productos desde backend Django (DB local)

```env
VITE_PRODUCT_SOURCE=db
VITE_TECH_PROD_API_URL=http://localhost:5000
VITE_DJANGO_API_URL=http://localhost:8000
```

**Flujo:**
```
Frontend → http://localhost:8000/api/products (Django)
                    ↓
          Django → http://localhost:5000/api/products (tech_prod)
                    ↓
          Django guarda en DB local
```

## Uso en có​digo

### Con el hook useProducts

```jsx
import { useProducts } from './hooks/useProducts';

function ProductList() {
  const { products, loading, error, refresh } = useProducts();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Con el servicio directo

```jsx
import { getProducts, isApiSource } from './services/productService';

async function loadProducts() {
  const products = await getProducts();
  console.log('Fuente:', isApiSource() ? 'API' : 'DB');
}
```
