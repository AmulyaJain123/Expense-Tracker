import TransactionRows from "./TransactionRows";
import { useEffect, useState } from "react";
import { useFirebase } from "../../store/firebase-context";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import more from "../../assets/open-book.gif";

export default function Transactions() {
  const transactions = useSelector((state) => state.dashboard.data);
  // console.log(transactions);
  return (
    <div className="flex flex-col relative p-4  rounded-2xl mx-4 min-h-[600px] overflow-hidden bg-[#f7ebfd]">
      <Link
        to={"/track/transactions"}
        className="absolute rounded-lg bg-[#fffdf7] border-2 border-stone-700 text-[black] font-medium shadow-xl text-md bottom-[40px] z-20  right-[50px]"
      >
        <div className="flex space-x-1 px-2 items-center">
          <img src={more} className="w-[50px]" alt="" />
        </div>
      </Link>
      <div className=" flex justify-center mb-4 pl-6 pr-2 rounded-xl  py-2 bg-[#9f21e3] ">
        <span className="text-2xl text-white font-semibold">
          Transaction History
        </span>
      </div>
      <div className="p-4 px-8 rounded-t-sm space-y-2 rounded-b-xl bg-[#f7ebfd] h-[400px] fadeBottom flex-grow">
        <header className="flex border-b-[2px] border-stone-500 pb-2 mr-2 space-x-8 text-md font-semibold text-stone-500 p-1 px-4">
          <span className="flex-[0.18]   min-w-[200px]">Name</span>
          <span className="flex-[0.14]   ">From</span>
          <span className="flex-[0.12]   ">Amount</span>
          <span className=" flex-[0.14]  ">To</span>
          <span className=" flex-[0.17]  ">Date</span>
          <span className="flex-[0.15]   ">Category</span>
          <span className="flex-[0.1]  ">Type</span>
        </header>
        <div className="flex flex-col pt-4 space-y-3 pr-2">
          {transactions === null ? (
            <p className="mx-4 flex flex-grow justify-center my-8 ">
              Loading....
            </p>
          ) : transactions.length === 0 ? (
            <p className="mx-4 flex flex-grow justify-center my-8">
              No Transactions
            </p>
          ) : (
            transactions.map((transaction) => {
              return <TransactionRows key={Math.random()} data={transaction} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
