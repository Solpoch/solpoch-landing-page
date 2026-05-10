import BentoCard from "./BentoCard";

export default function DappPayload() {
  return (
    <BentoCard>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-transparent w-fit sm:mt-12 my-8 mx-6 sm:mx-8">
          <img src="/bento/payload.svg" alt="" className="h-full" />
        </div>
        <div className="flex flex-col sm:pb-12 px-8 pb-8">
          <h3 className="text-lg sm:text-[36px]">Complete Transparency</h3>
          <div className="text-gray-400 text-xs sm:text-sm">
            <p className="mt-2">See what your dApp actually sent.</p>
            <ul className="list-disc ml-4">
              <li>Decode instructions</li>
              <li>Inspect accounts + params</li>
              <li>Verify program interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}