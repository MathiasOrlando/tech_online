import './CategoryBar.css'

function CategoryBar({ categories, productsByCategory, onCategoryClick }) {
  const totalProducts = categories.reduce((sum, cat) => sum + (productsByCategory[cat]?.length || 0), 0)

  // Obtener la primera imagen de cada categorí¡¡a
  const getCategoryImage = (category) => {
    const products = productsByCategory[category] || []
    if (products.length === 0) return null
    
    const firstProduct = products[0]
    if (firstProduct.images && firstProduct.images.length > 0) {
      return firstProduct.images[0]
    }
    return null
  }

  return (
    <div className="category-bar-container">
      <div className="category-bar">
        <div className="category-bar-header">
          <h2 className="category-bar-title">📂 Categorí¡¡as</h2>
          <span className="category-bar-total">{totalProducts} productos en total</span>
        </div>
        <div className="category-bar-scroll">
          {categories.map(category => {
            const image = getCategoryImage(category)
            
            return (
              <button
                key={category}
                className="category-bar-item"
                onClick={() => onCategoryClick(category)}
              >
                {image ? (
                  <div className="category-image">
                    <img src={image} alt={category} />
                    <div className="category-image-overlay"></div>
                  </div>
                ) : (
                  <div className="category-image category-image-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
                <div className="category-info">
                  <span className="category-name">{category}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryBar
