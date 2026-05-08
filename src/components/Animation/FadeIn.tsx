import { motion } from "motion/react";

export default function FadeIn({
  children,
  clsassName,
  dealy = 0.1,
}: {
  children: React.ReactNode;
  clsassName?: string;
  dealy?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: dealy }}
      className={clsassName || "max-w-4xl mb-12"}
    >
      {children}
    </motion.div>
  )
}