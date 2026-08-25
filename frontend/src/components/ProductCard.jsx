import './ProductCard.css'

function ProductCard({ product, onAdd, formatPrice }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder"></div>
        )}
        {product.images && product.images.length > 0 && !imageError ? (
          <img 
            src={product.images[0]} 
            alt={product.title}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
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

export default ProductCard
