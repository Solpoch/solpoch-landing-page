import { useRef, useState } from "react";
import { Check, Pause, Play, X } from "lucide-react";
import FadeIn from "./Animation/FadeIn";

type VideoWithOverlayProps = {
  src: string;
};

function VideoWithOverlay({ src }: VideoWithOverlayProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        className="rounded-2xl"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      ></video>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute bottom-3 left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/75"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-8 sm:py-34">
      <FadeIn
        className="max-w-4xl mb-4 sm:mb-16"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
          <div className="flex gap-1 sm:gap-4 justify-center flex-wrap">
            Yet Another
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-primary">
              Wallet ?
            </span>
            Not Really
          </div>
          {/* <div className="text-xs font-secondary font-normal sm:text-xl text-gray-300 mt-1 sm:mt-4 text-center">
            A dev-first wallet built for debugging, not just sending
          </div> */}
        </h1>
      </FadeIn>
      <div>
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap justify-center items-center">

          {/* failure card */}
          <FadeIn
          delay={0.3}
            className="relative h-[520px] w-full sm:h-[565px] sm:w-[488px]"
          >
            <div className="bg-rose-400 w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-8">
              <VideoWithOverlay src="https://solpoch.sfo3.cdn.digitaloceanspaces.com/tx-error.webm" />
              <div className="text-rose-300 mt-12 font-normal text-2xl">
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
          </FadeIn>

          {/* success card */}
          <FadeIn
            delay={0.5}
            className="relative h-[520px] w-[400px] sm:h-[565px] sm:w-[488px]"
          >
            <div className="bg-primary w-[150px] h-[200px] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="backdrop-blur-[100px] bg-white/2 absolute top-0 left-0 w-full h-full rounded-4xl p-8">
              <VideoWithOverlay src="https://solpoch.sfo3.cdn.digitaloceanspaces.com/tx-success.webm" />
              {/* card content needs update */}
              <div>
                <div className="text-gray-300 mt-12 font-normal text-2xl">
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
          </FadeIn>

        </div>
      </div>
    </div>
  )
}