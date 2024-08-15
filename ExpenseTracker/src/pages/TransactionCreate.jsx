import { useState, useRef } from "react";
import Incoming from "../components/transactionCreateComponents/Incoming";
import Outgoing from "../components/transactionCreateComponents/Outgoing";

export default function TransactionCreate() {
  const typeRef = useRef();
  const [type, setType] = useState("Outgoing");

  function typeChange() {
    setType(typeRef.current.value);
  }

  return (
    <div className="h-full w-full whiteScr overflow-auto sm:px-16 pt-8 pb-[200px] text-stone-700 rounded-l-xl">
      <div className="flex flex-col text-center sm:text-start xl:flex-row space-y-6 xl:space-y-0 justify-between bg-white rounded-xl m-4 items-center flex-grow p-3">
        <div className="text-xl sm:text-2xl 2xl:text-3xl font-bold xl:ml-8">
          <span>Create</span>{" "}
          <span className="mx-[10px] rounded-xl bg-purple-500 px-4 pb-1 text-white">
            {type}
          </span>{" "}
          <span>Transaction</span>
        </div>
        <div className="flex space-x-6 text-sm xl:text-base items-center">
          <label htmlFor="transactionType">Transaction Type :</label>
          <select
            ref={typeRef}
            className="bg-slate-200 p-1 rounded-lg px-3"
            defaultValue={"Outgoing"}
            name="transactionType"
            onChange={typeChange}
            id=""
          >
            <option value="Incoming">Incoming</option>
            <option value="Outgoing">Outgoing</option>
          </select>
        </div>
      </div>
      <div className="mt-[30px] flex flex-col items-center">
        {type === "Outgoing" ? <Outgoing /> : <Incoming />}
      </div>
    </div>
  );
}
