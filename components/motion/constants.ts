/** Soft ease-out — pa overshoot (y ≤ 1) që shkakton “shkëputje” në fund. */
export const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  }),
};

/** Vetëm orkestron fëmijët — pa e fshehur container-in (shmang flash në fund të faqes). */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};
