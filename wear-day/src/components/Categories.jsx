import Icon from './Icon.jsx'
import './Categories.css'

const categories = [
  ['T-shirts', 'photo-1521572163474-6864f9cf17ab'],
  ['Shirts', 'photo-1598033129183-c4f50c736f10'],
  ['Pants', 'photo-1473966968600-fa801b869a1a'],
  ['Denim', 'photo-1541099649105-f69ad21f3246'],
  ['Hoodies', 'photo-1556821840-3a63f95609a7'],
  ['Jackets', 'photo-1591047139829-d91aecb6caea'],
  ['Accessories', 'photo-1544816155-12df9643f363'],
  ['Shoes', 'photo-1600185365483-26d7a4cc7519'],
]

function Categories() {
  return (
    <section className="categories section-wrap" id="categories">
      <div className="section-heading">
        <div><span className="eyebrow">Find your new favorite</span><h2>Shop by category</h2></div>
        <a className="text-link" href="#new-arrivals">View everything <Icon name="arrow" size={16} /></a>
      </div>
      <div className="category-grid">
        {categories.map(([name, photo], index) => (
          <a className="category-card" href="#new-arrivals" key={name}>
            <div className="category-image"><img src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=550&q=80`} alt="" /></div>
            <div className="category-label"><span>{name}</span><Icon name="arrow" size={15} /></div>
            {index === 0 && <span className="category-sr-label">Shop</span>}
          </a>
        ))}
      </div>
    </section>
  )
}

export default Categories
