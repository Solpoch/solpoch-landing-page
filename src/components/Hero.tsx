import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { useState } from "react";
import DownloadModal from "./Modals/DownloadModal";
import { githubUrl } from "../lib/constants";
import ProblemSection from "./ProblemSection";

export default function Hero() {

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <>
      {
        showDownloadModal && <DownloadModal setShowDownloadModal={setShowDownloadModal} />
      }
      <section className="relative overflow-hidden pt-32 pb-6 sm:pb-30 lg:pt-48 lg:pb-30 hero">

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            The Dev Wallet for Solana */}
              <img src="/logo-long.png" alt="Solpoch Logo" className="h-6 sm:h-12 mb-4" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
                <span className="text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-[#534fff]">
                  Chrome DevTools
                </span>
                <div className="flex sm:gap-4 flex-wrap justify-center">
                  for Solana
                  <span className="font-secondary font-bold italic text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-[#534fff] leading-[1]">
                    Transactions
                  </span>
                </div>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl text-sm sm:text-lg text-slate-300 mb-10 font-secondary"
            >
              Simulate, trace execution, and auto-fix transactions before they fail.
              Stop guessing why your transaction broke and
              see exactly what your dApp is doing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-20"
            >
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                onClick={() => setShowDownloadModal(true)}
              >
                Download Alpha
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                onClick={() => window.open(githubUrl, "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </button>
            </motion.div>
          </div>

          {/* Visuals */}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
            <div className="absolute bottom-[10%] right-[calc(50%-500px)] w-[1000px] h-[450px] rounded-full bg-primary/10 blur-[120px] sm:block hidden" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sm:flex items-center justify-center z-10"
          >
            <img src="/product2.png" alt="divider" className="w-full max-w-4xl my-16 z-10 mt-8" />
          </motion.div>

        </div>
      </section>
    </>
  );
}