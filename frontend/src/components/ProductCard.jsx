import { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product, onAdd, formatPrice }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!product.available || added) return

    onAdd(product)
    setAdded(true)

    window.setTimeout(() => {
      setAdded(false)
    }, 2500)
  }

  return (
    <article className={`product-card ${added ? 'is-added' : ''}`}>
      <div className="product-image">
        {!imageLoaded && !imageError && <div className="image-placeholder" />}

        {product.images?.length > 0 && !imageError ? (
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="no-image" aria-label="Producto sin imagen">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {added && (
          <div className="added-badge" aria-label="Producto agregado al carrito">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price || formatPrice(product.priceNumeric)}</p>

        <button
          type="button"
          className={`add-to-cart-btn ${added ? 'is-added' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.available || added}
        >
          {added ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Agregado
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Agregar al carrito
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
