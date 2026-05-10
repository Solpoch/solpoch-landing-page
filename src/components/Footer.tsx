import { useState } from "react";
import DownloadModal from "./Modals/DownloadModal";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const isMobile = window.innerWidth < 640; // Simple check for mobile devices

  return (
    <div>
      {
        showDownloadModal && <DownloadModal setShowDownloadModal={setShowDownloadModal} />
      }
      <footer className={`w-screen h-[590px]  ${isMobile ? 'bg-footer-mobile' : 'bg-footer'}`} >
        <div className="sm:pt-16 sm:px-16 sm:w-1/3 pt-8 px-8">
          <img src="/logo-long.png" alt="Solpoch Logo" className="h-6 sm:h-12 sm:mb-12 mb-8" />
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">Ready to supercharge your Solana development?</h2>
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() => setShowDownloadModal(true)}
            >
              Download Alpha
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            {/* <button className="sm:inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 hidden"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </button> */}
          </div>
        </div>
      </footer>
    </div>
  )
}