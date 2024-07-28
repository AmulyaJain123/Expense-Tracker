import { useEffect } from "react";
import { formatVal, splitAlgo } from "../../util/algo";
import { useSelector } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useDispatch } from "react-redux";
import AddBillNavThumbs from "../../UIComponents/AddBillNavThumbs";
import BillComponent from "../splitCreateComponents/BillComponent";
import DiscardButton from "../../UIComponents/DiscardButton";
import SaveToDB from "./SaveToDB";

export default function SplitResultStage() {
  const bills = useSelector((state) => state.splitCreate.bills);
  const friends = useSelector((state) => state.splitCreate.friends);
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);

  useEffect(() => {
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  const selectedBill = useSelector(
    (state) => state.splitCreate.selectBillNavStatus
  );
  let res = splitAlgo(bills);

  return (
    <>
      <div className="flex flex-col space-y-4 px-12">
        <div className="text-3xl font-bold text-white flex flex-grow rounded-xl bg-[#9F21E3] py-4 mb-4 uppercase justify-center">
          Split Summary
        </div>

        <div className="flex space-x-4">
          <div className="rounded-xl min-w-[300px] bg-white p-3 ">
            <div className="rounded-xl border-dashed border-2 border-stone-300 bg-[#F7EBFD] flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Split Name
              </div>
              <div className="rounded-lg h-[80px] font-medium flex-auto text-lg py-2 mt-2 flex justify-center items-center text-stone-400">
                {splitInfo.splitName}
              </div>
            </div>
          </div>
          <div className="rounded-xl min-w-[300px] bg-white p-3 ">
            <div className="rounded-xl border-dashed border-2 border-stone-300 bg-[#F7EBFD] flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Split Created On
              </div>
              <div className="rounded-lg h-[80px] font-medium text-lg py-2 mt-2 flex justify-center items-center text-stone-400">
                {splitInfo.splitDate}
              </div>
            </div>
          </div>
          <div className="rounded-xl flex-grow bg-white p-3 ">
            <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Split Description
              </div>
              <div className="rounded-lg h-[80px] p-4 font-medium flex text-center justify-center items-center text-lg mt-2  text-stone-400">
                {splitInfo.description}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="rounded-xl bg-white flex-col space-y-3 p-3 w-[350px] h-[500px]">
            <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] h-full flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Registered Friends
              </div>
              <div className="customScroll rounded-lg overflow-auto text-lg py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                {friends.map((friend, index) => {
                  return (
                    <li
                      key={friend.name}
                      className="mb-4 px-4 flex w-full text-lg"
                    >
                      <div className="min-w-[50px]">
                        <span className="bg-[#fff] flex justify-center items-center w-[35px] h-[35px] rounded-lg ">
                          {index + 1}
                        </span>
                      </div>

                      <span className="bg-[#fff] flex-grow  flex px-4 items-center h-[35px] rounded-lg ">
                        <span>{friend.name}</span>
                      </span>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-xl flex-grow bg-white flex-col space-y-3 p-3 w-[400px] h-[500px]">
            <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] h-full flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Transactions to Liquidate
              </div>
              <div className="customScroll rounded-lg  overflow-auto font-medium text-lg py-2 pt-4 mt-4 flex flex-col text-stone-400">
                {res.ans.map((ele) => {
                  return (
                    <li
                      key={Math.random()}
                      className="mb-4 px-2 flex w-full text-lg"
                    >
                      <div className="w-[200px]">
                        <span className="bg-[#fff] flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                          {ele.start}
                        </span>
                      </div>
                      <div className="w-[200px]">
                        <span className="flex w-fit px-2 mx-auto items-center h-[35px]">
                          Pays
                        </span>
                      </div>
                      <div className="w-[200px]">
                        <span className="bg-[#fff] ml-auto flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                          {ele.end}
                        </span>
                      </div>
                      <div className="w-[190px] ml-[100px]">
                        <span className="bg-[#fff] px-2 ml-auto flex w-fit justify-center items-center h-[35px] rounded-lg ">
                          {formatVal(ele.amount)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="rounded-xl bg-white flex-col space-y-3 p-3 w-[400px] h-[740px]">
            <div className="rounded-xl border-dashed border-2 border-stone-300 h-full bg-[#F7EBFD] flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Expenditure
              </div>
              <div className="customScroll rounded-lg overflow-auto text-lg py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                {res.expenditure.map((ele) => {
                  return (
                    <li
                      key={ele.name}
                      className="mb-4 flex w-full justify-between text-lg"
                    >
                      <div className="">
                        <span className="bg-[#fff] flex justify-center items-center px-2 w-fit h-[35px] rounded-lg ">
                          {ele.name}
                        </span>
                      </div>

                      <span className="bg-[#fff] flex px-2 items-center h-[35px] rounded-lg ">
                        {formatVal(ele.amount)}
                      </span>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-grow bg-[#fff] flex flex-col p-3 rounded-xl ">
            <div className="rounded-xl border-dashed border-2 border-stone-300  bg-[#F7EBFD] flex p-3 flex-grow flex-col">
              <div className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                Registered Bills
              </div>
              <div className=" rounded-lg  text-lg py-2 flex font-medium flex-col text-stone-400">
                <div className="text-lg flex flex-col text-stone-500  rounded-lg  ">
                  <div className="border-b-2 border-white gap-y-2 gap-x-2 p-4 flex flex-wrap flex-grow ">
                    {bills.map((bill) => {
                      return (
                        <AddBillNavThumbs
                          key={bill.id + "yu"}
                          status={bill.id === selectedBill ? "true" : "false"}
                          viewOnly="true"
                          identity={bill.id}
                        >
                          {bill.billName}
                        </AddBillNavThumbs>
                      );
                    })}
                  </div>

                  <div className="p-4 w-full overflow-auto">
                    {selectedBill === null ? (
                      <p className="text-center">No Bill Selected</p>
                    ) : (
                      <BillComponent id={selectedBill} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-8 mt-6 mb-6">
        <DiscardButton>Discard</DiscardButton>
        <SaveToDB res={res} />
      </div>
    </>
  );
}
