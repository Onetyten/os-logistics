import SpotlightBorder from "../SpotlightBorder"

export default function OrderByCountryLazy() {
  return (
        <SpotlightBorder className="bg-boxclr rounded-md row-span-3 w-full overflow-hidden lg:h-auto relative p-3 lg:col-span-2 col-span-4 xl:col-span-4 2xl:col-span-2 shadow-md">

            <div className=" h-12 w-9/10 bg-background shadow-md text-sm sticky top-0 flex my-4 mb-0 justify-around">

            </div>

            <div className='overflow-y-hidden flex-1 w-9/10 bg-background'>
            </div>
        </SpotlightBorder>
  )
}
