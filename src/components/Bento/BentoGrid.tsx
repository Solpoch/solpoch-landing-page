import BentoCard from "./BentoCard";

export default function BentoGrid() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-4xl">

        <div className="flex gap-12 w-fit mx-auto justify-center flex-wrap">
          <BentoCard />
          <BentoCard />
        </div>

      </div>
    </div>
  )
}