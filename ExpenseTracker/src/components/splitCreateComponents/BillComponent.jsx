import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useSelector } from "react-redux";
import { formatVal } from "../../util/algo";

export default function BillComponent({ id }) {
  const bills = useSelector((state) => state.splitCreate.bills);
  // console.log(bills);
  const reqBill = bills.find((bill) => {
    return bill.id === id ? true : false;
  });
  const dispatch = useDispatch();
  if (reqBill === undefined) {
    return <p className="text-center">No Bill Selected.</p>;
  }
  const preDate = new Date(reqBill.billDate);
  const date = `${preDate.getDate()}/${
    preDate.getMonth() + 1
  }/${preDate.getFullYear()}`;
  // console.log(date);
  // console.log(reqBill);

  return (
    <div className="px-3 pt-3 flex flex-col space-y-4 w-full h-full">
      <div className="flex justify-between">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Name :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">
            {reqBill.billName}
          </span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Bill Date :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">{date}</span>
        </div>
      </div>

      <div className="flex">
        <div className="p-1 px-2 bg-white h-fit flex rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Description :
          </span>
          <span className="px-2 text-stone-400 w-[400px] h-[80px]">
            {reqBill.description}
          </span>
        </div>
      </div>

      <div className="flex space-x-10">
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Paid By :
          </span>
          <span className="p-1 text-stone-400 px-2 h-fit ">
            {reqBill.payedBy}
          </span>
        </div>
        <div className="p-1 px-2 bg-white h-fit  rounded-lg">
          <span className="text-black mr-3 text-md font-semibold">
            Total Amount :
          </span>
          <span className="p-1 px-2 text-stone-400 h-fit ">
            {formatVal(reqBill.totalAmt)}
          </span>
        </div>
      </div>

      <div className="p-1 px-2 bg-white h-fit  rounded-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-black text-md p-2 px-4 font-semibold">
            Shares :
          </span>
          <div className="p-5 pt-3 px-16 h-[250px] overflow-auto text-stone-400 customScroll">
            {reqBill.shares.map((share) => {
              return (
                <div key={share.name} className="flex justify-between">
                  <span>{share.name}</span>
                  <span>{formatVal(share.share)}</span>
                </div>
              );
            })}
            <div className="flex mt-4 justify-between">
              <span className="text-black">Total</span>
              <span>{formatVal(reqBill.totalAmt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
