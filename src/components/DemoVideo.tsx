import { motion } from 'motion/react';

export default function DemoVideo() {

  const chapters = [
    {
      title: "Problem",
      time: 0
    },
    {
      title: "Failed Transaction",
      time: 18
    },
    {
      title: "Solpoch Analysis",
      time: 42
    },
    {
      title: "Debugging",
      time: 71
    }
  ]

  return (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute bottom-[10%] right-[calc(50%-500px)] w-[1000px] h-[450px] rounded-full bg-primary/10 blur-[120px] sm:block hidden" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="sm:flex items-center justify-center z-10"
      >
        <img src="/product4.png" alt="divider" className="w-full max-w-4xl my-16 z-10 mt-8" />
      </motion.div>
    </>
  )
}