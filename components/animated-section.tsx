"use client"

import { motion, type MotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className = "", ...motionProps }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: "easeOut",
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.section>
  )
}
