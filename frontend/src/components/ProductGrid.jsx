import './ProductGrid.css'

function ProductGrid({ products, productsByCategory, loading, onAddToCart }) {
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
          <p>Intent con otros filtros o categor</p>
        </div>
      </div>
    )
  }

  // Si hay categor seleccionada, mostrar solo esa seccin
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
          />
        </div>
      )
    }
  }

  // Mostrar todos los productos agrupados por categora
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
          />
        )
      ))}
    </div>
  )
}

function ProductSection({ category, products, onAddToCart, formatPrice }) {
  return (
    <section className="product-section">
      <div className="section-header">
        <h2 className="section-title">{category}</h2>
        <span className="section-count">{products.length} productos</span>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAdd={onAddToCart}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, onAdd, formatPrice }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} />
        ) : (
          <div className="no-image">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price || formatPrice(product.priceNumeric)}</p>
        <button 
          className="add-to-cart-btn" 
          onClick={() => onAdd(product)}
          disabled={!product.available}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {product.available ? 'Agregar' : 'No disponible'}
        </button>
      </div>
    </div>
  )
}

export default ProductGrid
