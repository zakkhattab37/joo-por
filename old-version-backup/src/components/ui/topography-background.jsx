"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

export function TopographyBackground({
  className,
  style,
  children,
  lineCount = 90,
  lineColor = "rgba(120, 120, 120, 1)",
  backgroundColor = "#0a0a0f",
  speed = 9,
  strokeWidth = 1,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null) 

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height

    // Higher resolution for crisp lines
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    let animationId
    let tick = 0

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // Generate terrain height at a point
    const getHeight = (x, t) => {
      const scale = 0.003
      return (
        Math.sin(x * scale * 2 + t) * 30 +
        Math.sin(x * scale * 3.7 + t * 0.7) * 20 +
        Math.sin(x * scale * 1.3 - t * 0.5) * 40 +
        Math.sin(x * scale * 5.1 + t * 1.2) * 10 +
        Math.sin(x * scale * 0.7 + t * 0.3) * 50
      )
    }

    // Animation
    const animate = () => {
      tick += 0.008 * speed

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = lineColor
      ctx.lineWidth = strokeWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      const spacing = height / (lineCount - 1)
      const padding = 50

      for (let i = 0; i < lineCount; i++) {
        const baseY = spacing * i

        ctx.beginPath()

        let started = false
        for (let x = -padding; x <= width + padding; x += 3) {
          const terrainHeight = getHeight(x + i * 100, tick)
          const y = baseY + terrainHeight

          if (!started) {
            ctx.moveTo(x, y)
            started = true
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [lineCount, lineColor, backgroundColor, speed, strokeWidth])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ 
        backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Default background behavior
        ...style
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }} 
      />

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.5,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 50%, transparent 0%, ${backgroundColor} 100%)`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${backgroundColor} 100%)`,
        }}
      />

      {/* Content layer */}
      {children && <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>{children}</div>}
    </div>
  )
}

export default function TopographyBackgroundDemo() {
  return <TopographyBackground />
}
