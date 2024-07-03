import { useRef } from "react";
import SplitViewModal from "./SplitViewModal";

export default function SplitBox({ data }) {
  const {
    createdAt,
    splitInfo,
    registeredFriends,
    transactionsToLiquidate,
    expenditure,
    bills,
  } = data;
  const modalRef = useRef();

  function clickHandle() {
    modalRef.current.open();
  }

  return (
    <>
      <SplitViewModal data={data} ref={modalRef} />
      <button
        onClick={clickHandle}
        className="splitBox hover:scale-105 duration-300 border-2 border-stone-300 flex flex-col space-y-4 text-xl font-medium justify-center items-center rounded-xl w-[200px] h-[200px]"
      >
        <span>{splitInfo.splitName}</span>
        <span className="text-lg font-normal">{splitInfo.splitDate}</span>
      </button>
    </>
  );
}
