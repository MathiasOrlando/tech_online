import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Tech Care Shop</h3>
          <p>Tu tienda de confianza para productos tecnológicos al mejor precio.</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📍 Asuncion, Paraguay</p>
          <p>📱 +595 9XX XXX XXX</p>
          <p>📧 info@techcareshop.com</p>
        </div>
        <div className="footer-section">
          <h4>Horarios</h4>
          <p>Lunes a Viernes</p>
          <p>8:00 AM - 6:00 PM</p>
          <p>Sabados: 9:00 AM - 1:00 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Tech Care Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
