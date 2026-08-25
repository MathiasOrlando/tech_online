import { useState } from 'react'
import './Cart.css'

function Cart({ cart, total, onRemove, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false)
  const formatPrice = (value) => {
    if (!value) return 'Gs 0'
    return `Gs ${value.toLocaleString('es-PY')}`
  }

  if (cart.length === 0) return null

  return (
    <>
      <div className="cart-float" onClick={() => setIsOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span className="cart-float-count">{cart.length}</span>
      </div>

      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Tu Carrito</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>x</button>
            </div>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">{item.price || formatPrice(item.priceNumeric)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-quantity">x{item.quantity}</span>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-total-value">{formatPrice(total)}</span>
              </div>
              <button className="checkout-btn" onClick={onCheckout}>
                💬 Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
