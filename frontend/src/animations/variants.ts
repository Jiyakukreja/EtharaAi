export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 }
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } }
};
