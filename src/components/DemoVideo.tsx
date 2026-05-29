import { motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PlayIcon, XIcon } from 'lucide-react';

type Chapter = {
  id: string
  title: string

  start: number
  end: number

  highlights: {
    title: string
    start: number
    end: number
    content: ReactNode
  }[]
}

export default function DemoVideo() {

  const [openVideoModal, setOpenVideoModal] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (openVideoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: unlocks scroll if component unmounts unexpectedly
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openVideoModal]);

  const chapters: Chapter[] = [
    {
      id: 'chapter-1',
      title: 'The Problem',
      start: 0,
      end: 60,
      highlights: [
        {
          title: "Debugging Solana Transactions is Hard",
          start: 10,
          end: 50,
          content: (
            <div>
              Developers struggle to debug Solana transactions due to limited tooling, leading to failed transactions and lost time.
            </div>
          )
        }
      ]
    }
  ]

  const activeChapter = chapters.find((chapter) => (
    currentTime >= chapter.start && currentTime < chapter.end
  ))

  const activeHighlights = (activeChapter?.highlights ?? []).filter((highlight) => (
    currentTime >= highlight.start && currentTime < highlight.end
  ))

  return (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute bottom-[10%] right-[calc(50%-500px)] w-[1000px] h-[450px] rounded-full bg-primary/10 blur-[120px] sm:block hidden" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="sm:flex items-center justify-center z-10 relative"
      >
        <div
          className='p-1 rounded-full bg-gradient-to-r from-[#534fff] to-[#618bff] cursor-pointer absolute m-auto z-20'
          onClick={() => { setOpenVideoModal(true) }}
        >
          <div className='p-4 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer'>
            <PlayIcon className='text-white/80' size={48} fill='black' />
          </div>
        </div>
        <img src="/product4.png" alt="divider" className="w-full max-w-4xl my-16 z-10 mt-8" />
      </motion.div>

      {/* video modal */}
      {
        openVideoModal && (
          <div className='grid grid-cols-[70%_calc(30%-var(--spacing)*4)] gap-8 text-white w-screen h-screen inset-0 fixed z-100 p-8 bg-black ' >
            {/* video player */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-3 relative'>
                <video
                  ref={videoRef}
                  src="https://solpoch.sfo3.cdn.digitaloceanspaces.com/solpoch-demo-day.webm"
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className='bg-white/10 rounded-2xl'
                />
                <div className='flex items-center gap-4 absolute w-full bg-black/50 bottom-0 left-0 p-4'>
                  <button
                    type="button"
                    className='rounded-md border border-white/20 px-3 py-1 text-sm'
                    onClick={() => {
                      const video = videoRef.current
                      if (!video) return
                      if (video.paused) {
                        void video.play()
                      } else {
                        video.pause()
                      }
                    }}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(duration, 0)}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => {
                      const video = videoRef.current
                      const nextTime = Number(e.target.value)
                      setCurrentTime(nextTime)
                      if (video) video.currentTime = nextTime
                    }}
                    className='w-full'
                  />
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-4 h-full overflow-scroll'>
                <div className='text-sm font-medium text-white/80'>Highlights</div>
                <div className='mt-3'>
                  {activeHighlights.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                      {activeHighlights.map((highlight, index) => (
                        <div key={`${activeChapter?.id ?? 'chapter'}-${index}`}>{highlight.content}</div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-sm text-white/50'>No highlights at this moment.</div>
                  )}
                </div>
              </div>
            </div>
            {/* chapters */}
            <div className='flex flex-col gap-3'>
              <div className="flex justify-between">
                <div className='text-sm font-medium text-white/80'>Timeline</div>
                <button className="flex gap-2 items-center text-sm text-pink-300">
                  close demo
                  <XIcon size={16} className="text-pink-300" />
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                {chapters.map((chapter) => {
                  const isActive = currentTime >= chapter.start && currentTime < chapter.end
                  return (
                    <div
                      key={chapter.id}
                      className={[
                        'rounded-lg border px-3 py-2 text-sm transition',
                        isActive ? 'border-white/50 bg-white/10 text-white' : 'border-white/10 text-white/60'
                      ].join(' ')}
                    >
                      <div className='font-medium'>{chapter.title}</div>
                      <div className='text-xs text-white/50'>{chapter.start}s - {chapter.end}s</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}