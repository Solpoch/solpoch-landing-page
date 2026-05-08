import { motion } from "motion/react";

export default function FadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-4xl mb-12"
    >
      {children}
    </motion.div>
  )
}