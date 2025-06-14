'use client'

import { useEffect } from 'react'

export default function TypedAnimation() {
  useEffect(() => {
    // Initialize Typed.js
    if (typeof window !== 'undefined' && (window as any).Typed) {
      const typedElement = document.getElementById('typed')
      const stringsElement = document.getElementById('typed-strings')
      
      if (typedElement && stringsElement) {
        const typed = new (window as any).Typed('#typed', {
          stringsElement: '#typed-strings',
          typeSpeed: 40,
          backSpeed: 40
        })
        
        return () => typed.destroy()
      }
    }
  }, [])

  return null // This component doesn't render anything
}