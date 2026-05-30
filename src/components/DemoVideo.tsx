import { motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CornerDownLeft, FishingHook, PauseIcon, PlayIcon, XIcon } from 'lucide-react';
import { LiquidMetal } from '@paper-design/shaders-react';
import FadeIn from './Animation/FadeIn';

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
    imp?: boolean
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
      title: 'The Problem: Wallet Black Boxes',
      start: 0,
      end: 25,
      highlights: [
        {
          title: "Unable to Debug Failed Transactions",
          start: 0,
          end: 17,
          content: (
            <div>
              Developers struggle to debug Solana transactions due to limited tooling, often leading to unexplained failed transactions and wasted time.
            </div>
          ),
        },
        {
          title: "Blind Approvals",
          start: 17,
          end: 25,
          content: (
            <div>
              Users are forced to blindly approve fishy transactions because traditional wallets act as opaque black boxes without exposing underlying execution details.
            </div>
          ),
        }
      ]
    },
    {
      id: 'chapter-2',
      title: 'Introducing Solpoch',
      start: 25,
      end: 61,
      highlights: [
        {
          title: "Chrome DevTools for Solana Wallets",
          start: 25,
          end: 61,
          content: (
            <FadeIn>
              <div className='border border-white/5 bg-fix p-6 h-full rounded-2xl w-full'>
                <h2 className='text-3xl font-bold'>What's <span className='text-primary'>Solpoch</span> ?</h2>
                <p className='mt-3 text-lg w-[60%]'>
                  Solpoch brings <span className='text-green-300'>observability, debugging, and security tooling <span className='font-bold'> directly into the wallet experience</span></span>, providing clear, live traces of every transaction call.
                </p>
              </div>
            </FadeIn>
          ),
        }
      ]
    },
    {
      id: 'chapter-3',
      title: 'Example 1: Live Debugging & Auto-Fixing',
      start: 61,
      end: 105,
      highlights: [
        {
          title: "Live Execution Traces",
          start: 65,
          end: 90,
          content: (
            <div className='flex gap-4 w-full'>
              <div className='p-6 bg-fix hue-rotate-200 rounded-2xl'>
                <h3 className='text-lg font-bold'>RPC trace</h3>
                <p className='text-gray-300 text-sm'>showing the sequence of RPC calls and time it took</p>
              </div>
              <div className='p-6 bg-fix hue-rotate-200 rounded-2xl'>
                <h3 className='text-lg font-bold'>Excecution trace</h3>
                <p className='text-gray-300 text-sm'>order of execution in valut, spl, rpc etc</p>
              </div>
              <ul>
                <li>Excecution trace - valut , rpc, spl etc</li>
                <li>tree of execution with payload and result</li>
              </ul>
            </div>
          ),
          imp: true
        },
        {
          title: "Ai-Powered Diagnosis",
          start: 90,
          end: 105,
          content: (
            <div>
              Solpoch breaks down failing operations into human-readable explanations and pinpoints the exact step and reason for failure, eliminating guesswork from debugging. tells you why it failed and how to fix it.
            </div>
          ),
          imp: true
        },
        {
          title: "One-Click Error Resolution",
          start: 109,
          end: 116,
          content: (
            <div>
              The extension identifies auto-fixable issues (like a missing Associated Token Account) and allows developers to resolve them instantly with a single confirmation click.
            </div>
          ),
        },
        {
          title: "Instruction Debugger",
          start: 116,
          end: 125,
          content: (
            <div>
              The extension identifies auto-fixable issues (like a missing Associated Token Account) and allows developers to resolve them instantly with a single confirmation click.
            </div>
          ),
        }
      ]
    },
    {
      id: 'chapter-4',
      title: 'Example 2: Security & Malicious Detection',
      start: 140,
      end: 160,
      highlights: [
        {
          title: "Wallet Standard & dApp Support",
          start: 140,
          end: 147,
          content: (
            <div>
              Because Solpoch supports the Solana wallet standard, its inspection capabilities work seamlessly across various decentralized applications.
            </div>
          ),
          imp: false
        },
        {
          title: "Catching Wallet Drainers",
          start: 147,
          end: 172,
          content: (
            <div>
              Pre-flight payload inspection analyzes behavior to detect malicious strings and suspicious patterns commonly seen in wallet drainer attacks before approval.
            </div>
          ),
          imp: true
        }
      ]
    },
    {
      id: 'chapter-5',
      title: 'Advanced Developer Tooling',
      start: 173,
      end: 180,
      highlights: [
        {
          title: "Dev Hooks & Inspection Tools",
          start: 173,
          end: 180,
          content: (
            <div>
              SolPouch exposes an array of built-in developer tools including manual ATA creation, copying cURL commands, transaction replay, and a dedicated developer playground.
            </div>
          ),
        }
      ]
    }
  ];

  const activeChapter = chapters.find((chapter) => (
    currentTime >= chapter.start && currentTime < chapter.end
  ))

  const activeHighlights = (activeChapter?.highlights ?? []).filter((highlight) => (
    currentTime >= highlight.start && currentTime < highlight.end
  ))

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return '0:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const seekTo = (value: number) => {
    const video = videoRef.current
    if (!video) return
    const nextTime = Math.min(Math.max(value, 0), duration || video.duration || value)
    video.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute bottom-[10%] right-[calc(50%-500px)] w-[1000px] h-[450px] rounded-full bg-primary/11 blur-[120px] sm:block hidden" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center z-10 relative"
      >
        <div className='w-fit absolute m-auto z-20 bottom-[50px] flex flex-col items-center gap-6'>
          <div
            className='relative inline-flex rounded-full overflow-hidden cursor-pointer'
            onClick={() => { setOpenVideoModal(true) }}
          >
            <LiquidMetal
              className='absolute inset-0 pointer-events-none'
              style={{ width: '100%', height: '100%' }}
              colorBack="#a8a8b3"
              colorTint="#f7f7fb"
              distortion={0.12}
              softness={0.08}
              repetition={2.3}
              shiftRed={0.35}
              shiftBlue={0.35}
              contour={0.45}
              speed={1.15}
              shape="circle"
            />
            <div className='relative z-10 p-8 rounded-full bg-white/10 hover:bg-primary/40 transition cursor-pointer text-xs flex flex-col items-center gap-2 text-black/40'>
              <PlayIcon className='text-white/80' size={48} fill='black' />
            </div>
          </div>
          <div className="text-center w-fit text-gray-200 text-xs">
            100s Demo
          </div>
        </div>
        <img src="/product4.png" alt="divider" className="w-full max-w-4xl my-16 z-10 mt-8" />
      </motion.div>

      {/* video modal */}
      {
        openVideoModal && (
          <div className='w-screen h-screen inset-0 fixed z-100 bg-black'>
            <div className='grid grid-cols-[70%_calc(30%-var(--spacing)*8)] gap-8 p-8 text-white w-screen h-screen' >
              {/* video player */}
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3 relative'>
                  <video
                    ref={videoRef}
                    src="https://solpoch.sfo3.cdn.digitaloceanspaces.com/solpoch-demo-day-1.webm"
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className='bg-white/10 rounded-2xl'
                  />
                  <div className='flex items-center gap-4 absolute w-full bg-gradient-to-t from-black to-transparent bottom-0 left-0 p-4'>
                    <button
                      type="button"
                      className='h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center aspect-square'
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
                      {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
                    </button>
                    <div className='text-xs text-white/60 w-24'>{formatTime(currentTime)} / {formatTime(duration)}</div>
                    <input
                      type="range"
                      min={0}
                      max={Math.max(duration, 0)}
                      step={0.1}
                      value={currentTime}
                      onChange={(e) => {
                        const nextTime = Number(e.target.value)
                        seekTo(nextTime)
                      }}
                      className='video-range w-full cursor-pointer'
                      style={{ background: `linear-gradient(90deg, #6d7bff ${progress}%, rgba(255,255,255,0.15) ${progress}%)` }}
                    />
                  </div>
                </div>
                <div className='h-full w-full overflow-scroll'>

                  {activeHighlights.length > 0 ?
                    activeHighlights.map((highlight, index) => (
                      <div className='w-full h-full overflow-hidden' key={`${activeChapter?.id ?? 'chapter'}-highlight-${index}`}>
                        {highlight.content}
                      </div>
                    ))
                    : null}

                </div>
              </div>
              {/* chapters */}
              <div className='flex flex-col gap-3 h-full overflow-y-auto'>
                <div className="flex justify-between sticky top-0 bg-black/70 backdrop-blur-sm">
                  <div className='text-sm font-medium text-white/80 '>Timeline</div>
                  <button
                    className="flex gap-2 items-center text-sm text-pink-300"
                    onClick={() => {
                      setOpenVideoModal(false)
                      const video = videoRef.current
                      if (video) video.pause()
                    }}
                  >
                    close demo
                    <XIcon size={16} className="text-pink-300" />
                  </button>
                </div>
                <div className='flex flex-col gap-4'>
                  {chapters.map((chapter) => {
                    const isActive = currentTime >= chapter.start && currentTime < chapter.end
                    const chapterProgress = Math.min(
                      100,
                      Math.max(0, ((currentTime - chapter.start) / (chapter.end - chapter.start)) * 100)
                    )
                    return (
                      <div
                        key={chapter.id}
                        className={[
                          'rounded-2xl px-4 py-3 text-sm transition',
                          isActive ? 'text-green-300 font-bold' : 'border-white/10 text-white/60'
                        ].join(' ')}
                      >
                        <button
                          className='flex w-full items-center justify-between text-left'
                          onClick={() => seekTo(chapter.start)}
                        >
                          <div>
                            <div className='font-medium'>{chapter.title}</div>
                            <div className='text-xs text-white/50'>{chapter.start}s - {chapter.end}s</div>
                          </div>
                          <div className='text-xs text-white/50'>
                            <CornerDownLeft size={14} className='inline-block mr-1' />
                            Jump
                          </div>
                        </button>
                        <div className='mt-3 h-1.5 w-full rounded-full bg-white/10'>
                          <div
                            className='h-1.5 rounded-full bg-gradient-to-r from-[#534fff] to-[#70ff6b]'
                            style={{ width: `${chapterProgress}%` }}
                          />
                        </div>
                        <div className='mt-3 flex flex-col gap-2 pl-3'>
                          {chapter.highlights.map((highlight, index) => {
                            const isHighlightActive = currentTime >= highlight.start && currentTime < highlight.end
                            return (
                              <button
                                key={`${chapter.id}-highlight-${index}`}
                                className={[
                                  'flex items-start gap-2 text-left text-xs transition rounded-xl',
                                  isHighlightActive ? 'text-green-300 font-bold' : 'text-white/60',
                                  highlight.imp ? 'bg-fix' : ''
                                ].join(' ')}
                                onClick={() => seekTo(highlight.start)}
                              >
                                <span
                                  className={[
                                    'mt-1 h-2 w-2 rounded-full',
                                    isHighlightActive ? 'bg-green-300' : 'bg-white/30'
                                  ].join(' ')}
                                />
                                <span className='flex-1'>
                                  <span className='block font-medium'>{highlight.title}</span>
                                  <span className='text-[11px] text-white/40'>{highlight.start}s - {highlight.end}s</span>
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      }
      <style>{`
        .video-range {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 999px;
          outline: none;
        }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 999px;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(109, 123, 255, 0.35);
          cursor: pointer;
        }
        .video-range::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 999px;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(109, 123, 255, 0.35);
          border: none;
          cursor: pointer;
        }
        .video-range::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: transparent;
        }
      `}</style>
    </>
  )
}