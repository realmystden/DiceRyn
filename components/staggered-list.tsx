"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  staggerDelay?: number
}

export function StaggeredList({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 0.1,
}: StaggeredListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className={className} variants={containerVariants} initial="hidden" animate="show">
      {children.map((child, index) => (
        <motion.div key={index} className={itemClassName} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
