import React, { useEffect, useRef, useState } from 'react'

type Props = {
  src?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  placeholder?: string
}

/**
 * LazyImage: usa IntersectionObserver para carregar a imagem apenas quando visível.
 * Fallback simples: se IntersectionObserver não disponível, carrega imediatamente.
 */
export default function LazyImage({ src, alt = '', className, style, placeholder }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!src) return
    const el = imgRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      // sem observer, carrega direto
      setIsVisible(true)
      setLoadedSrc(src)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setLoadedSrc(src)
            obs.disconnect()
          }
        })
      },
      { rootMargin: '200px' } // pré-load quando estiver próximo
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [src])

  // Mostramos a imagem real quando `loadedSrc` definido; enquanto isso, podemos mostrar placeholder (se houver)
  return (
    <img
      ref={imgRef}
      src={loadedSrc ?? placeholder ?? ''}
      data-src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      draggable={false}
    />
  )
}
