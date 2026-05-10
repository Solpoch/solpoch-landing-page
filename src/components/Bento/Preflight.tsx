import BentoCard from "./BentoCard";

export default function Preflight() {
  return (
    <BentoCard>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-transparent w-fit sm:mt-12 my-8 mx-6 sm:mx-8">
          <img src="/bento/preflight.png" alt="" className="h-full" />
        </div>
        <div className="flex flex-col sm:pb-12 px-8 pb-8">
          <h3 className="text-lg sm:text-[36px]">Preflight Simulation</h3>
          <div className="text-gray-400 text-xs sm:text-sm">
            <p className="mt-2">Know your transaction will fail , before you send it.</p>
            <ul className="list-disc ml-4">
              <li>Simulate every transaction</li>
              <li>Detect failures early</li>
              <li>Prevent wasted fees and time</li>
            </ul>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}