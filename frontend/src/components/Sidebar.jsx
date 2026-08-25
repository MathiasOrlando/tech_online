import './Sidebar.css'

function Sidebar({ categories, filters, onFilterChange }) {
  const handleSortChange = (e) => {
    onFilterChange(prev => ({ ...prev, sortBy: e.target.value }))
  }

  const handleCategoryChange = (cat) => {
    onFilterChange(prev => ({ ...prev, categoria: prev.categoria === cat ? '' : cat }))
  }

  const handlePriceRangeChange = (type, value) => {
    onFilterChange(prev => ({ ...prev, [type]: value }))
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">🔍 Buscar</h3>
        <input
          type="text"
          placeholder="Nombre del producto..."
          value={filters.q}
          onChange={e => onFilterChange(prev => ({ ...prev, q: e.target.value }))}
          className="search-input-sidebar"
        />
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">📂 Categor</h3>
        <div className="category-list">
          <button
            className={`category-item ${filters.categoria === '' ? 'active' : ''}`}
            onClick={() => onFilterChange(prev => ({ ...prev, categoria: '' }))}
          >
            📦 Todos los productos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-item ${filters.categoria === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">💰 Rango de Precio</h3>
        <div className="price-range">
          <input
            type="number"
            placeholder="Mn Gs"
            value={filters.minPrice}
            onChange={e => handlePriceRangeChange('minPrice', e.target.value)}
            className="price-input"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Mx Gs"
            value={filters.maxPrice}
            onChange={e => handlePriceRangeChange('maxPrice', e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">🔽 Ordenar por</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>

      <div className="sidebar-section">
        <button
          className="clear-filters-btn"
          onClick={() => onFilterChange({ 
            q: '', 
            categoria: '', 
            proveedor: '',
            sortBy: 'default',
            minPrice: '',
            maxPrice: ''
          })}
        >
          🗑️ Limpiar filtros
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
