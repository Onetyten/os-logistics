import SpotlightBorder from "../SpotlightBorder";

export default function OverviewLazy() {
  return (
    <div className={` col-span-4 flex flex-col justify-between  w-full row-span-3 gap-2 `}>
        <SpotlightBorder className="rounded-md w-full h-2/3 shadow-md p-3 sm:p-6 flex flex-col justify-between items-center gap-2">
            <div className="w-full flex-1 my-6 bg-background rounded-md overflow-hidden ">
            </div>
            <p className="text-center w-[50%] h-6 bg-background text-muted flex gap-2 justify-center text-sm font-semibold"></p>

        </SpotlightBorder>
        <div className=" w-full h-1/3 flex gap-2">
          <SpotlightBorder className="h-full rounded-md flex justify-center items-center flex-1 shadow-md p-3 sm:p-6">
            <div className="h-2/3 w-5/6 bg-background" ></div>
          </SpotlightBorder>
          <SpotlightBorder className="h-full rounded-md flex justify-center items-center flex-1 shadow-md p-3 sm:p-6">
            <div className="h-2/3 w-5/6 bg-background" ></div>
          </SpotlightBorder>
          <SpotlightBorder className="h-full rounded-md flex justify-center items-center flex-1 shadow-md p-3 sm:p-6">
            <div className="h-2/3 w-5/6 bg-background" ></div>
          </SpotlightBorder>
          <SpotlightBorder className="h-full rounded-md flex justify-center items-center flex-1 shadow-md p-3 sm:p-6">
            <div className="h-2/3 w-5/6 bg-background" ></div>
          </SpotlightBorder>
        </div>


        

    </div>
  )
}
