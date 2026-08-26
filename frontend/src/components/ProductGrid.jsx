import { useState } from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

const PRODUCTS_PER_PAGE = 5

function ProductGrid({ products, productsByCategory, loading, onAddToCart, categoryRefs, onShowMore }) {
  const formatPrice = (value) => {
    if (!value) return 'Consultar'
    return `Gs ${value.toLocaleString('es-PY')}`
  }

  if (loading) {
    return (
      <div className="product-grid">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-grid">
        <div className="no-products">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros filtros o categoría</p>
        </div>
      </div>
    )
  }

  if (productsByCategory && Object.keys(productsByCategory).length > 0) {
    const selectedCategory = Object.keys(productsByCategory).find(cat =>
      productsByCategory[cat].length > 0 && products.every(p => p.category === cat)
    )

    if (selectedCategory) {
      return (
        <div className="product-grid">
          <ProductSection
            category={selectedCategory}
            products={productsByCategory[selectedCategory]}
            onAddToCart={onAddToCart}
            formatPrice={formatPrice}
            categoryRef={el => { categoryRefs.current[selectedCategory] = el }}
          />
        </div>
      )
    }
  }

  return (
    <div className="product-grid">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        categoryProducts.length > 0 && (
          <ProductSection
            key={category}
            category={category}
            products={categoryProducts}
            onAddToCart={onAddToCart}
            formatPrice={formatPrice}
            categoryRef={el => { categoryRefs.current[category] = el }}
          />
        )
      ))}
    </div>
  )
}

function ProductSection({ category, products, onAddToCart, formatPrice, categoryRef }) {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)
  const visibleProducts = products.slice(0, visibleCount)
  const remainingProducts = products.length - visibleProducts.length

  return (
    <section className="product-section" ref={categoryRef}>
      <div className="section-header">
        <h2 className="section-title">{category}</h2>
        <span className="section-count">{products.length} productos</span>
      </div>

      <div className="products-grid">
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAddToCart}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {remainingProducts > 0 && (
        <div className="show-more-container">
          <button
            type="button"
            className="show-more-btn"
            onClick={() => setVisibleCount(current => current + PRODUCTS_PER_PAGE)}
          >
            Ver más productos ({remainingProducts} restantes)
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductGrid
