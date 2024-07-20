import Filter from "../components/transactionPageComponents/Filter";
import TransactionRows from "../components/dashBoardComponents/TransactionRows";
import { useLoaderData } from "react-router-dom";
import DataDisplay from "../components/transactionPageComponents/DataDisplay";

export default function TransactionPage() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <div className="bg-[#f7ebfd] rounded-xl pb-[40px] m-4 mt-[30px] p-4">
          <div className="relative flex flex-col overflow-hidden h-fit ">
            <Filter />

            <div className="flex flex-col">
              <div className=" flex justify-between mb-16 z-20 rounded-xl  p-4 px-8 bg-[#9f21e3] ">
                <span className="text-3xl text-white font-semibold">
                  Transaction History
                </span>
              </div>

              <div className="p-4 px-8 rounded-t-sm space-y-2 rounded-b-xl bg-[#f7ebfd] flex-grow">
                <DataDisplay data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
