import { useState, useEffect } from 'react'

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId))
  }

  const clearCart = () => setCart([])
  const total = cart.reduce((sum, p) => sum + (p.priceNumeric || 0) * p.quantity, 0)

  const formatPrice = (value) => {
    if (!value) return 'Gs 0'
    return `Gs ${value.toLocaleString('es-PY')}`
  }

  const toWhatsAppMessage = () => {
    const lines = cart.map(p => `• ${p.title} x${p.quantity} - ${p.price || formatPrice(p.priceNumeric)}`)
    return `Hola! Quiero pedir:%0A${lines.join('%0A')}%0A%0ATotal: ${formatPrice(total)}`
  }

  return { cart, addToCart, removeFromCart, clearCart, total, toWhatsAppMessage, formatPrice }
}
