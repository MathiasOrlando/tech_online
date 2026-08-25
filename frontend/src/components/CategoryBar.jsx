import './CategoryBar.css'

function CategoryBar({ categories, productsByCategory, onCategoryClick }) {
  const totalProducts = categories.reduce((sum, cat) => sum + (productsByCategory[cat]?.length || 0), 0)

  return (
    <div className="category-bar-container">
      <div className="category-bar">
        <div className="category-bar-header">
          <h2 className="category-bar-title">📂 Categorí¡¡as</h2>
          <span className="category-bar-total">{totalProducts} productos en total</span>
        </div>
        <div className="category-bar-scroll">
          {categories.map(category => {
            const count = productsByCategory[category]?.length || 0
            return (
              <button
                key={category}
                className="category-bar-item"
                onClick={() => onCategoryClick(category)}
              >
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryBar
