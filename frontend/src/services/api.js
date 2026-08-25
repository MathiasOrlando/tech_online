const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/store'

export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${API_BASE}/products?${qs}`)
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`)
  if (!res.ok) throw new Error('Error al cargar categorias')
  return res.json()
}
