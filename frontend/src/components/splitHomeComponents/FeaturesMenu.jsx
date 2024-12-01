/*Multiple Bills: Handle various expenses with different participants effortlessly.
Optimized Settlements: Get the reduced number of transactions required to balance the splits.
User-Friendly Interface: Easily add people, bills, and track expenses with our intuitive platform. 
flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]
*/

export default function FeaturesMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-1/3">
          Multiple Bills{" "}
        </div>
        <div className="sm:text-base text-sm  sm:w-2/3">
          Handle various expenses with different participants effortlessly.
        </div>
      </div>
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-1/3">
          Optimized Settlements
        </div>
        <div className="sm:text-base text-sm sm:w-2/3">
          Get the reduced number of transactions required to balance the splits.
        </div>
      </div>
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-1/3">
          User-Friendly Interface
        </div>
        <div className="sm:text-base text-sm sm:w-2/3">
          Easily add people, bills, and track expenses with our intuitive
          platform.
        </div>
      </div>
    </div>
  );
}
