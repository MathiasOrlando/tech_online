import { useState, useEffect } from 'react'
import { fetchProducts, fetchCategories } from './services/api'
import { useCart } from './hooks/useCart'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import ProductCard from './components/ProductCard'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ q: '', categoria: '', proveedor: '' })
  const { cart, addToCart, removeFromCart, total, toWhatsAppMessage } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchProducts(filters),
      fetchCategories()
    ]).then(([productsData, categoriesData]) => {
      setProducts(productsData.products || [])
      setCategories(categoriesData || [])
      setLoading(false)
    }).catch(err => {
      console.error('Error:', err)
      setLoading(false)
    })
  }, [filters])

  const handleWhatsAppOrder = () => {
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '5959XXXXXXXX'
    const message = toWhatsAppMessage()
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />
      <main className="main-content">
        <SearchBar value={filters.q} onChange={q => setFilters(prev => ({ ...prev, q }))} />
        <CategoryFilter categories={categories} selected={filters.categoria} onChange={cat => setFilters(prev => ({ ...prev, categoria: cat }))} />
        {loading ? (
          <div className="loading"><div className="spinner"></div><p>Cargando productos...</p></div>
        ) : (
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="no-products"><p>No se encontraron productos</p></div>
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        total={total} 
        onRemove={removeFromCart} 
        onCheckout={handleWhatsAppOrder} 
      />
    </div>
  )
}

export default App
