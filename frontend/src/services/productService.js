/**
 * Servicio para obtener productos.
 * Decide automáticamente si consumir desde tech_prod (API) o backend Django (DB).
 */

const PRODUCT_SOURCE = import.meta.env.VITE_PRODUCT_SOURCE || 'api';
const TECH_PROD_API_URL = import.meta.env.VITE_TECH_PROD_API_URL || 'http://localhost:5000';
const DJANGO_API_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://localhost:8000';

// DEBUG: Ver configuración
console.log('🔧 PRODUCT_SOURCE:', PRODUCT_SOURCE);
console.log('🔧 TECH_PROD_API_URL:', TECH_PROD_API_URL);
console.log('🔧 DJANGO_API_URL:', DJANGO_API_URL);

/**
 * Obtiene la URL base según la configuración
 */
function getBaseUrl() {
  if (PRODUCT_SOURCE === 'api') {
    console.log('📡 Usando API directa (tech_prod)');
    return TECH_PROD_API_URL;
  }
  console.log('📡 Usando DB (Django backend)');
  return DJANGO_API_URL;
}

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export async function getProducts() {
  const baseUrl = getBaseUrl();
  console.log('🌐 Fetching from:', `${baseUrl}/api/products`);
  
  const response = await fetch(`${baseUrl}/api/products`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al obtener productos');
  }
  
  const data = await response.json();
  // Si viene de Django, está en data.products
  // Si viene de tech_prod, puede estar en data.products o directamente data
  return data.products || data;
}

/**
 * Obtiene un producto por ID
 * @param {number|string} productId - ID del producto
 * @returns {Promise<Object>} Producto
 */
export async function getProductById(productId) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/products/${productId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Producto ${productId} no encontrado`);
  }
  
  const data = await response.json();
  return data.product || data;
}

/**
 * Verifica si la fuente es API (tech_prod directo)
 */
export function isApiSource() {
  return PRODUCT_SOURCE === 'api';
}

/**
 * Verifica si la fuente es DB (backend Django)
 */
export function isDbSource() {
  return PRODUCT_SOURCE === 'db';
}
