import Icon from './Icon.jsx'
import './OutfitBuilder.css'

const outfit = [
  { name: 'Essential Tee', price: '$19.99', photo: 'photo-1521572163474-6864f9cf17ab', tone: 'Olive green' },
  { name: 'Chino Pants', price: '$39.99', photo: 'photo-1473966968600-fa801b869a1a', tone: 'Sand' },
  { name: 'Overshirt', price: '$49.99', photo: 'photo-1598033129183-c4f50c736f10', tone: 'Natural' },
  { name: 'Clean Sneakers', price: '$69.99', photo: 'photo-1600185365483-26d7a4cc7519', tone: 'White' },
]

function OutfitBuilder() {
  return (
    <section className="outfit-builder" id="outfit-builder">
      <div className="section-wrap outfit-inner">
        <div className="outfit-intro">
          <span className="eyebrow">Build your outfit</span>
          <h2>Build your outfit</h2>
          <p>Mix. Match. Make it yours.</p>
          <a className="text-link" href="#new-arrivals">Start building <Icon name="arrow" size={13} /></a>
          <div className="outfit-progress"><span>THE WEEKEND SET</span><div><i /></div><span>01 — 03</span></div>
        </div>
        <div className="outfit-items">
          {outfit.map((item, index) => (
            <article className="outfit-item" key={item.name}>
              <a className="outfit-photo" href="#new-arrivals">
                <img src={`https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=650&q=80`} alt={item.name} />
                <span className="outfit-number">0{index + 1}</span>
              </a>
              <div className="outfit-item-info">
                <div><h3>{item.name}</h3><span>{item.tone}</span></div>
                <span>{item.price}</span>
              </div>
            </article>
          ))}
          <a className="outfit-look" href="#new-arrivals">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80" alt="A complete relaxed ORVE look" loading="lazy" />
            <strong>Your Look</strong>
            <span>$179.95</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default OutfitBuilder
