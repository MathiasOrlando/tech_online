import { useState, useEffect, useRef } from 'react'
import { getProducts } from './services/productService'
import { fetchCategories } from './services/api'
import { useCart } from './hooks/useCart'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryBar from './components/CategoryBar'
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
  const categoryRefs = useRef({})


  useEffect(() => {
    setLoading(true)
    
    // Obtener productos desde productService (configurable)
    getProducts()
      .then(productsData => {
        setProducts(productsData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading products:', err)
        setLoading(false)
      })
    
    // Obtener categorías (sigue usando api.js por ahora)
    fetchCategories()
      .then(categoriesData => {
        setCategories(categoriesData || [])
      })
      .catch(err => {
        console.error('Error loading categories:', err)
      })
  }, [])


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


  // Funció¡¡¡n para scroll suave a una categorí¡¡a
  const scrollToCategory = (category) => {
    const element = categoryRefs.current[category]
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }


  return (
    <div className="app">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />
      <CategoryBar 
        categories={categories}
        productsByCategory={productsByCategory}
        onCategoryClick={scrollToCategory}
      />
      <div className="main-layout">
        <ProductGrid 
          products={products}
          productsByCategory={productsByCategory}
          loading={loading}
          onAddToCart={addToCart}
          categoryRefs={categoryRefs}
          onShowMore={scrollToCategory}
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
