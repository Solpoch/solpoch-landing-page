import { Check, X } from "lucide-react";
import { motion } from "motion/react";

export default function ProblemSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center pb-34">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mb-16"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
          <div className="flex gap-4 justify-center flex-wrap">
            Yet Another
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-[#534fff]">
              Wallet
            </span>
            Not Really
          </div>
          <div className="text-lg sm:text-2xl text-gray-300 mt-4 text-center">
            A dev-first wallet built for debugging, not just sending
          </div>
        </h1>
      </motion.div>
      <div>
        <div className="flex flex-col sm:flex-row gap-12">

          {/* failure card */}
          <div
            className="relative h-[480px] w-[400px]"
          >
            <div className="bg-rose-400 w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-8">
              <video src="/tx-error.mp4" autoPlay loop muted className="rounded-2xl"></video>
              <div className="text-rose-300 mt-6 font-normal text-2xl">
                <h1>No idea ? You're flying blind</h1>
              </div>
              {/* card content needs update */}
              <div>
                <div className="text-rose-300/50 text-sm">
                  <p>Transactions fail without clear reasons, leaving you to guess and check endlessly.</p>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <div className="flex items-center">
                    <X size={16} className="text-rose-300" />
                    <p className="text-rose-300 text-sm ml-2">Failing with useless errors</p>
                  </div>
                  <div className="flex items-center">
                    <X size={16} className="text-rose-300" />
                    <p className="text-rose-300 text-sm ml-2">Everything is a black box</p>
                  </div>
                  <div className="flex items-center">
                    <X size={16} className="text-rose-300" />
                    <p className="text-rose-300 text-sm ml-2">dApp makes malicious calls</p>
                  </div>
                  <div className="flex items-center">
                    <X size={16} className="text-rose-300" />
                    <p className="text-rose-300 text-sm ml-2">Debug by guessing and retrying</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* success card */}
          <div
            className="relative h-[480px] w-[400px]"
          >
            <div className="bg-primary w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-8">
              <video src="/tx-success.mp4" autoPlay loop muted className="rounded-2xl"></video>
              {/* card content needs update */}
              <div>
                <div className="text-gray-300 mt-6 font-normal text-2xl">
                  <h1>Debug and fix with Solpoch</h1>
                </div>
                <div className="text-gray-300/50 text-sm">
                  <p>Simulate, trace RPC calls, and auto-fix transactions before they fail.</p>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <div className="flex items-center">
                    <Check size={16} className="text-gray-300" />
                    <p className="text-gray-300 text-sm ml-2">Transaction Debugger</p>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-gray-300" />
                    <p className="text-gray-300 text-sm ml-2">Execution Tracing</p>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-gray-300" />
                    <p className="text-gray-300 text-sm ml-2">See what the dApp actually sent</p>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-gray-300" />
                    <p className="text-gray-300 text-sm ml-2">Ai-powered diagnostics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}