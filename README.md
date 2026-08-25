# Tech Care Shop - Tienda con WhatsApp Checkout

Tienda online moderna construida con React + Django que permite a los clientes armar un carrito y enviar el pedido por WhatsApp.

## Caracteristicas

- 🛒 Catalogo de productos con busqueda y filtros
- 📂 Filtrado por categorias
- 🛍 Carrito persistente (localStorage)
- 💬 Checkout por WhatsApp
- 📱 Diseño responsive mobile-first
- 🚀 Deploy con Docker

## Stack Tecnologico

- **Frontend**: React + Vite
- **Backend**: Django (opcional)
- **API**: Flask (tu API existente)
- **Contenedores**: Docker + Docker Compose

## Configuracion

### 1. Clonar repositorio

```bash
git clone https://github.com/MathiasOrlando/tech_online.git
cd tech_online
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Variables:
- `VITE_API_URL`: URL de tu API Flask
- `VITE_WHATSAPP_PHONE`: Numero de WhatsApp

### 3. Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

Disponible en `http://localhost:5173`

## API de Productos

La app consume tu API Flask:

- `/api/store/products` - Lista de productos
- `/api/store/categories` - Lista de categorias

## Flujo de Pedido

1. Cliente agrega productos al carrito
2. Revisa el carrito con el total
3. Click en "Pedir por WhatsApp"
4. Se abre WhatsApp con mensaje pre-armado

## Personalizacion

- Colores: `frontend/src/components/Header.css`
- WhatsApp: `.env` o `App.jsx`

## Licencia

MIT
