export default function AiDiagnosis() {
  return (
    <div className="bg-linear-to-b from-white/10 to-white/2 p-0.5 text-white rounded-3xl">
      <div className="bg-black sm:h-[308px] sm:w-[1009px] rounded-3xl bg-ai">

        <div className="flex flex-col sm:pb-12 pb-8 px-8 pt-8">
          <div className="flex items-center gap-4">
            <img src="/ai.png" alt="" className="h-6 sm:h-[36px]" />
            <h3 className="text-lg sm:text-[36px]">AI-Powered Diagnosis</h3>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm ml-4">
            <p className="mt-2">Know your transaction will fail , before you send it.</p>
            <ul className="list-disc ml-4">
              <li>Simulate every transaction</li>
              <li>Detect failures early</li>
              <li>Prevent wasted fees and time</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}