import './CategoryFilter.css'

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter">
      <button className={`category-btn ${selected === '' ? 'active' : ''}`} onClick={() => onChange('')}>Todos</button>
      {categories.map(cat => (
        <button key={cat} className={`category-btn ${selected === cat ? 'active' : ''}`} onClick={() => onChange(cat)}>{cat}</button>
      ))}
    </div>
  )
}

export default CategoryFilter
