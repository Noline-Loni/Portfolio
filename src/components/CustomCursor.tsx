import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-hover]'))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [visible, cursorX, cursorY])

  if (isTouch || !visible) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full bg-content"
          style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3 }}
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-content"
          animate={{
            width: hovering ? 64 : 40,
            height: hovering ? 64 : 40,
            marginLeft: hovering ? -32 : -20,
            marginTop: hovering ? -32 : -20,
            backgroundColor: hovering
              ? 'rgba(245, 245, 239, 0.06)'
              : 'rgba(245, 245, 239, 0)',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </>
  )
}
