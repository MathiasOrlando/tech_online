import './Header.css'

function Header({ cartCount, onOpenCart }) {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="top-bar-content">
          <span>🚚 Envios a todo el Paraguay</span>
          <span>📱 Pedidos: +595 9XX XXX XXX</span>
        </div>
      </div>
      <div className="header-main">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">Tech Care Shop</h1>
            <p className="tagline">Tu tienda de tecnología</p>
          </div>
          <div className="header-actions">
            <button className="cart-button" onClick={onOpenCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-text">Carrito</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
