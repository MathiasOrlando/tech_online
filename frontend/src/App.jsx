import { useState, useEffect } from 'react'
import { fetchProducts, fetchCategories } from './services/api'
import { useCart } from './hooks/useCart'
import Header from './components/Header'
import Hero from './components/Hero'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ 
    q: '', 
    categoria: '', 
    proveedor: '',
    sortBy: 'default',
    minPrice: '',
    maxPrice: ''
  })
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

  // Agrupar productos por categoría
  const productsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat)
    return acc
  }, {})

  return (
    <div className="app">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />
      <div className="main-layout">
        <Sidebar 
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />
        <ProductGrid 
          products={products}
          productsByCategory={productsByCategory}
          loading={loading}
          onAddToCart={addToCart}
        />
      </div>
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
