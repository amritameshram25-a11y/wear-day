import { useEffect, useRef, useState } from 'react'
import Icon from '../shared/Icon.jsx'
import { heroSlides } from '../../data/heroSlides.js'
import '../../styles/components/Hero.css'

const SLIDE_INTERVAL = 5000
const SWIPE_THRESHOLD = 45

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const activeSlide = heroSlides[activeIndex]
  const goTo = (index) => setActiveIndex((index + heroSlides.length) % heroSlides.length)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(query.matches)
    const syncVisibility = () => setPageHidden(document.hidden)
    syncMotion()
    syncVisibility()
    query.addEventListener('change', syncMotion)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      query.removeEventListener('change', syncMotion)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || hovered || focused || dragging || reducedMotion || pageHidden) return
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length)
    }, SLIDE_INTERVAL)
    return () => window.clearTimeout(timer)
  }, [activeIndex, paused, hovered, focused, dragging, reducedMotion, pageHidden])

  const startGesture = (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
    if (event.target.closest('button')) return
    suppressClick.current = false
    gesture.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId }
    setDragging(true)
  }

  const finishGesture = (event) => {
    const start = gesture.current
    if (!start || start.pointerId !== event.pointerId) return
    const distanceX = event.clientX - start.x
    const distanceY = event.clientY - start.y
    if (Math.abs(distanceX) > SWIPE_THRESHOLD && Math.abs(distanceX) > Math.abs(distanceY) * 1.25) {
      suppressClick.current = true
      goTo(activeIndex + (distanceX < 0 ? 1 : -1))
    }
    gesture.current = null
    setDragging(false)
  }

  return (
    <section
      className="hero section-wrap"
      id="home"
      role="region"
      aria-roledescription="carousel"
      aria-label="WearDay featured collections"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); gesture.current = null; setDragging(false) }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onPointerDown={startGesture}
      onPointerUp={finishGesture}
      onPointerCancel={() => { gesture.current = null; setDragging(false) }}
      onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false } }}
      onKeyDown={(event) => {
        if (event.target.matches('input, select, textarea')) return
        if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1) }
      }}
    >
      <div className="hero-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="hero-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}: ${slide.eyebrow}`} aria-hidden={activeIndex !== index}>
            <img className="hero-banner" src={slide.image} alt={slide.alt} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" />
            <div className="hero-shade" />
          </div>
        ))}
      </div>
      <div className="hero-copy">
        <span className="hero-eyebrow">{activeSlide.eyebrow}</span>
        <h1>{activeSlide.title.map((line) => <span key={line}>{line}</span>)}</h1>
        <p>{activeSlide.description}</p>
        <div className="hero-buttons">
          <a className="button button-dark" href={activeSlide.href} draggable="false">{activeSlide.primary}</a>
          <a className="button button-light" href="#categories" draggable="false">Explore Collections</a>
        </div>
      </div>
      <div className="hero-shipping">
        <span><Icon name="truck" size={16} /> Free shipping</span><small>on orders $50+</small>
        <span><Icon name="return" size={16} /> Easy returns</span><small>30-day returns</small>
      </div>
      <div className="hero-controls">
        <button className="hero-arrow" aria-label="Previous banner" onClick={() => goTo(activeIndex - 1)}><span aria-hidden="true">←</span></button>
        <div className="hero-dots" aria-label="Choose a banner">
          {heroSlides.map((slide, index) => <button key={slide.id} aria-label={`Show banner ${index + 1}: ${slide.eyebrow}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}
        </div>
        <button className="hero-arrow" aria-label="Next banner" onClick={() => goTo(activeIndex + 1)}><span aria-hidden="true">→</span></button>
        {!reducedMotion && <button className="hero-pause" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>}
      </div>
      <span className="sr-only" aria-live={paused || focused || reducedMotion ? 'polite' : 'off'}>Banner {activeIndex + 1} of {heroSlides.length}: {activeSlide.eyebrow}</span>
    </section>
  )
}

export default Hero
