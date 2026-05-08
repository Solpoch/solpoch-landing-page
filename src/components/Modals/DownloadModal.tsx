import { Download, X } from "lucide-react";
import { releaseUrl } from "../../lib/constants";

export default function DownloadModal({ setShowDownloadModal }: { setShowDownloadModal: (show: boolean) => void }) {
  const steps = [
    {
      title: "Download & Unzip",
      description: "Download the extension zip file and extract it to a folder",
    },
    {
      title: "Open Chrome Extensions",
      description: "Navigate to chrome://extensions in your browser",
      command: "chrome://extensions"
    },
    {
      title: "Enable Developer Mode",
      description: "Toggle the switch in the top-right corner",
    },
    {
      title: "Load Unpacked Extension",
      description: "Click 'Load Unpacked' and select the extracted folder",
    }
  ];
  return (
    <div className="fixed w-full h-full bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="flex flex-col gap-3 w-250 max-h-fit bg-[#1a1a1a] p-6 rounded-2xl">
        <div className="flex justify-end">
          <button onClick={() => setShowDownloadModal(false)} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
          <div className="flex flex-col gap-6 h-full">
            <h2 className="text-xl font-bold text-white">Installation Guide</h2>
            <ul className="text-gray-300 text-left text-sm flex flex-col gap-3 w-[80%] list-decimal list-inside">
              {steps.map((step, index) => (
                <li key={index}>
                  <span className="font-semibold">{step.title}</span> - {step.description}
                </li>
              ))}
            </ul>
            <div className="flex h-full items-end">
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 gap-4"
                onClick={() => window.open(releaseUrl, "_blank")}
              >
                <Download className="h-4 w-4" />
                Download Alpha
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start h-fit bg-black/20 rounded-2xl">
            <img src="/install.png" alt="Installation Guide" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}