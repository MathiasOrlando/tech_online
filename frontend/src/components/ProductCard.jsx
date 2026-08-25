import './ProductCard.css'

function ProductCard({ product, onAdd }) {
  const formatPrice = (value) => {
    if (!value) return 'Consultar'
    return `Gs ${value.toLocaleString('es-PY')}`
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price || formatPrice(product.priceNumeric)}</p>
        <button className="add-to-cart-btn" onClick={onAdd} disabled={!product.available}>
          {product.available ? 'Agregar al carrito' : 'No disponible'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
