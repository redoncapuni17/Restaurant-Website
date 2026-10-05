"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./constants";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const OFFSETS = {
  up: { y: 20, x: 0 },
  down: { y: -16, x: 0 },
  left: { y: 0, x: 20 },
  right: { y: 0, x: -20 },
  none: { y: 0, x: 0 },
} as const;

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.75,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const { x, y } = OFFSETS[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
