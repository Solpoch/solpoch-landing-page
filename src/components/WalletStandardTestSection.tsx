import { motion } from "motion/react";
import WalletTestPanel from "./WalletTest";

export default function WalletStandardTestSection() {
  return (
    <div
      className="flex flex-col items-center relative p-12 px-4"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute bottom-[20%] right-[calc(50%-450px)] w-[900px] h-[200px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      {/* Headline */}
      <div className="w-full flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-4xl mb-4 sm:mb-16"
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
          <div className="flex gap-1 sm:gap-4 justify-center flex-wrap">
              Supporting
              <span className="text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-primary">
                Wallet Standard
              </span>
            </div>
            <div className="text-xs font-secondary font-normal sm:text-xl text-gray-300 mt-1 sm:mt-4 text-center">
              Test wallet standard compatibility instantly
            </div>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}

        >
          <WalletTestPanel />
        </motion.div>
      </div>

    </div>
  )
}