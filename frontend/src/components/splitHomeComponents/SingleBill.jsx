export default function SingleBill({ data }) {
  const { billName, billDate, billDesc, payedBy, totalAmount, shares } = data;
  return (
    <div className="px-3 pt-3  flex flex-col space-y-4 w-full h-full">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0  justify-between">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Name :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">{billName}</span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Date :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">{billDate}</span>
        </div>
      </div>

      <div className="flex">
        <div className="p-1 px-2 bg-white flex-grow sm:flex-row flex-col items-center space-y-2 sm:space-y-0 sm:items-start flex rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Description :
          </span>
          <span className="px-2 text-stone-400 text-center sm:text-start min-h-[80px]">
            {billDesc}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Paid By :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">{payedBy}</span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Total Amount :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">{totalAmount}</span>
        </div>
      </div>

      <div className="p-1 px-2 bg-white h-fit  rounded-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-black text-md p-2 px-4 font-semibold">
            Shares :
          </span>
          <div className="p-5 pt-3 px-4 sm:px-16 h-[250px] overflow-auto text-stone-400 customScroll">
            {shares.map((share) => {
              return (
                <div key={share.name} className="flex justify-between">
                  <span>{share.name}</span>
                  <span>{share.amt}</span>
                </div>
              );
            })}
            <div className="flex mt-4 justify-between">
              <span className="text-black">Total</span>
              <span>{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
