export default function BentoCard() {
  return (
    <div className="bg-linear-to-b from-white/10 to-white/2 p-0.5 text-white rounded-3xl">
      <div className="bg-linear-to-b from-black/75 to-black from-50% to-90% h-[465px] w-[388px] rounded-3xl">
        <div className="h-full flex flex-col justify-between p-6 gap-6">
          <div className="bg-transparenth-fit">
            <img src="/bento/trace.png" alt="" className="h-full"/>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[26px]">Preflight Simulation</h3>
            <div className="text-gray-400 text-sm">
              <p className="text-sm mt-2">Know your transaction will fail , before you send it.</p>
              <ul className="list-disc ml-4">
                <li>Simulate every transaction</li>
                <li>Detect failures early</li>
                <li>Prevent wasted fees and time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}