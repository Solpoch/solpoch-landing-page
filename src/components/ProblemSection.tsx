import { Check, X } from "lucide-react";
import { motion } from "motion/react";

export default function ProblemSection() {
  return (
    <div className="w-full flex justify-center items-center pb-16 translate-y-[-50px]">
      <div className="flex flex-col sm:flex-row gap-12">

        {/* failure card */}
        <motion.div
          className="relative h-[480px] w-[400px]"
        >
          <div className="bg-rose-400 w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-6">
            <video src="/tx-error.mp4" autoPlay loop muted className="rounded-2xl"></video>
            <div className="text-rose-300 mt-6 font-bold text-2xl">
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
                  <p className="text-rose-300 text-sm ml-2">No traces.</p>
                </div>
                <div className="flex items-center">
                  <X size={16} className="text-rose-300" />
                  <p className="text-rose-300 text-sm ml-2">No payload visibility.</p>
                </div>
                <div className="flex items-center">
                  <X size={16} className="text-rose-300" />
                  <p className="text-rose-300 text-sm ml-2">No execution insight.</p>
                </div>
                <div className="flex items-center">
                  <X size={16} className="text-rose-300" />
                  <p className="text-rose-300 text-sm ml-2">Just retry and pray.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* success card */}
        <motion.div
          className="relative h-[480px] w-[400px]"
        >
          <div className="bg-primary w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-6">
            <video src="/tx-success.mp4" autoPlay loop muted className="rounded-2xl"></video>
            {/* card content needs update */}
            <div>
              <div className="text-gray-300 mt-6 font-bold text-2xl">
                <h1>Debug and fix with Solpoch</h1>
              </div>
              <div className="text-gray-300/50 text-sm">
                <p>Simulate, trace RPC calls, and auto-fix transactions before they fail.</p>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex items-center">
                  <Check size={16} className="text-gray-300" />
                  <p className="text-gray-300 text-sm ml-2">Instruction trace waterfall.</p>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-gray-300" />
                  <p className="text-gray-300 text-sm ml-2">View dApp payload.</p>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-gray-300" />
                  <p className="text-gray-300 text-sm ml-2">View execution insight.</p>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-gray-300" />
                  <p className="text-gray-300 text-sm ml-2">Ai-powered diagnostics.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}