export default function Hook() {
  return (
    <div className="bg-linear-to-b from-white/20 to-white/5 p-0.5 text-white rounded-3xl">
      <div className="bg-linear-to-b from-black/90 to-black from-50% to-90% sm:h-[269px] sm:w-[488px] w-[calc(100vw-40px)] h-[200px] rounded-3xl relative">
        <div className="bg-hook absolute inset-0 rounded-3xl backdrop-blur-sm"></div>

        <div className="absolute inset-0 px-8 pt-8">
          <div className="flex flex-col sm:pb-12 pb-4">
            <h3 className="text-lg sm:text-[36px]">Dev Hooks - SDK</h3>
            <div className="text-gray-400 text-xs sm:text-sm">
              <p >Plug Solpoch into your dev workflow</p>
            </div>
          </div>

          <div className="bg-white/3 h-[80px] w-[200px] p-3 rounded-lg mt-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
            </div>
            <div className="text-xs text-gray-400 mt-2.5 font-mono">{`solpoch.onTrace(cb)`}</div>
            <div className="text-xs text-gray-400 mt-0.5 font-mono">{`solpoch.onError(cb)`}</div>
          </div>
        </div>

      </div>
    </div>
  )
}