import FadeIn from "../Animation/FadeIn";
import AiDiagnosis from "./AiDiagnosis";
import AiFix from "./AiFix";
import DappPayload from "./DappPayload";
import Hook from "./Hook";
import Preflight from "./Preflight";
import Trace from "./Trace";

export default function BentoGrid() {
  return (
    <div className="w-full flex flex-col justify-center items-center pb-34 px-4">
      <FadeIn
        delay={0.2}
        className="max-w-4xl mb-16"
      >
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-7xl mb-6">
          <div className="flex gap-1 sm:gap-4 justify-center flex-wrap">
            Supercharged
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] to-[#534fff]">
              Debugging
            </span>
            {/* Not Really */}
          </div>
          <div className="text-xs font-secondary font-normal sm:text-xl text-gray-300 mt-1 sm:mt-4 text-center">
            A dev-first wallet built for debugging, not just sending
          </div>
        </h1>
      </FadeIn>
      <div className="w-full max-w-7xl flex flex-col justify-center items-center gap-6">
        <div className="flex gap-6 w-fit mx-auto justify-center flex-wrap">
          <FadeIn>
            <Preflight />
          </FadeIn>
          <FadeIn delay={0.3}>
            <Trace />
          </FadeIn>
        </div>
        <FadeIn>
          <AiDiagnosis />
        </FadeIn>
        <div className="flex gap-6 w-fit mx-auto justify-center flex-wrap">
          <FadeIn delay={0.2} className=" ">
            <DappPayload />
          </FadeIn>
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.3}>
              <Hook />
            </FadeIn>
            <FadeIn delay={0.1}>
              <AiFix />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}