export default function AiFix() {
  return (
    <div className="bg-linear-to-b from-white/20 to-white/5 p-0.5 text-white rounded-3xl">
      <div className="bg-linear-to-b from-black/90 to-black from-50% to-90% sm:h-[269px] sm:w-[488px] w-[calc(100vw-40px)] h-[200px] rounded-3xl relative">
        <div className="bg-fix absolute inset-0 rounded-3xl backdrop-blur-sm"></div>

        <div className="absolute inset-0 px-8 pt-8">
          <div className="flex flex-col sm:pb-12 pb-4">
            <h3 className="text-lg sm:text-[36px]">Auto-Fix Suggestions</h3>
            <div className="text-gray-400 text-xs sm:text-sm">
              <p >Fix transactions in one click, AI magic !</p>
            </div>
          </div>

          <div className="rounded-lg mt-1">
            <img src="/ai.png" alt="AI Fix" className="h-[70px]"/>
          </div>
        </div>

      </div>
    </div>
  )
}