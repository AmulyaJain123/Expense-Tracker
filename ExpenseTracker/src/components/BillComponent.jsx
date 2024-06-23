import { useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";

export default function BillComponent({ payer, total, shares, id, ind }) {
  console.log(shares);
  const dispatch = useDispatch();

  function removeClick() {
    dispatch(splitCreateActions.removeBill(id));
  }

  return (
    <div className="flex w-full py-[20px]">
      <div className="h-full w-[60px] mr-2">{ind + 1} .</div>
      <div className="flex-grow">
        <header className="flex w-full items-center">
          <span className="p-1 px-2 rounded-md bg-white font-semibold">
            <span className="mr-2">{total}</span>
            <span>&#8377;</span>
          </span>
          <span className="mx-[20px]">Payed by </span>
          <span className="p-1 px-2 rounded-md bg-white font-semibold">
            {payer}
          </span>
          <button onClick={removeClick} className="ml-auto">
            <i className="fi fi-ss-cross-circle text-xl"></i>
          </button>
        </header>
        <div className="text-lg mt-[30px] mb-[20px] font-semibold ">
          Shares :
        </div>
        <div className="flex flex-col  px-[100px] pr-[200px] ">
          {shares.map((share) => {
            return (
              <div className="p-2 flex justify-between  items-center mb-10px">
                <div className="">
                  <span className="p-1 px-2  rounded-md bg-white font-semibold">
                    {share.name}
                  </span>
                </div>
                <span className="p-1 px-2  rounded-md bg-white font-semibold">
                  <span className="mr-2">{share.share}</span>
                  <span>&#8377;</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
