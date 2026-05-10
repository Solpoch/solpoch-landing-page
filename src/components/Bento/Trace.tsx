import BentoCard from "./BentoCard";

export default function Trace() {
  return (
    <BentoCard>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-transparent w-fit sm:mt-12 my-8 mx-2 sm:mx-4">
          <img src="/bento/trace.svg" alt="" className="h-full" />
        </div>
        <div className="flex flex-col sm:pb-12 px-8 pb-8">
          <h3 className="text-lg sm:text-[36px]">Execution Trace Waterfall</h3>
          <div className="text-gray-400 text-xs sm:text-sm">
            <p className="mt-2">See every step your transaction makes.</p>
            <ul className="list-disc ml-4">
              <li>Execution order</li>
              <li>Time taken per call</li>
              <li>Failures highlighted instantly</li>
            </ul>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}