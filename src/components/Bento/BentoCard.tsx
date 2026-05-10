export default function BentoCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-b from-white/20 to-white/5 p-0.5 text-white rounded-3xl">
      <div className="bg-linear-to-b from-black/90 to-black from-50% to-90% sm:h-[565px] sm:w-[488px] rounded-3xl">
        {children}
      </div>
    </div>
  )
}