import { useRef, useState } from "react";
import SplitViewModal from "./SplitViewModal";
import { useFirebase } from "../../store/firebase-context";
import MinimizedSplit from "./MinimizedSplit";

export default function SplitBox({ data, setSplitState }) {
  const {
    createdAt,
    splitInfo,
    registeredFriends,
    transactionsToLiquidate,
    expenditure,
    bills,
    docId,
    bgPattern,
  } = data;
  const modalRef = useRef();
  const confirmRef = useRef();
  const [deleting, setDeleting] = useState(false);
  const firebase = useFirebase();

  function clickHandle() {
    modalRef.current.open();
  }

  function deleteHandle() {
    confirmRef.current.showModal();
  }

  function closeHandle() {
    confirmRef.current.close();
  }

  async function deleteConfirmed() {
    setDeleting(true);
    const reply = await firebase.deleteSplit(docId);
    setDeleting(false);
    if (reply.status === 200) {
      alert("Split Deleted Succesfully!!");
    } else {
      alert("ERROR: Delete Unsuccessful :(");
      confirmRef.current.close();
      return;
    }
    setSplitState((preval) => {
      const retVal = preval.filter((x) => x.docId != docId);
      console.log(retVal);
      return retVal;
    });
  }
  const str =
    "text-black border-2 border-stone-600 flex flex-col space-y-4 text-xl font-semibold justify-center items-center rounded-xl w-[200px] h-[200px] " +
    bgPattern;
  return (
    <>
      <SplitViewModal data={data} ref={modalRef} />
      <dialog ref={confirmRef} className="rounded-2xl">
        <div className="rounded-xl w-[600px] bg-stone-100">
          <h1 className="p-4 pl-[30px] text-xl font-medium">
            Are you sure you want to delete the following Split ?
          </h1>
          <div className="flex space-x-[50px] px-[50px]">
            <MinimizedSplit
              name={splitInfo.splitName}
              date={splitInfo.splitDate}
              bgPattern={bgPattern}
            />
            <div className="flex flex-col mt-[50px] space-y-2">
              <div className="flex space-x-6">
                <span>Name: </span>
                <span>{splitInfo.splitName}</span>
              </div>
              <div className="flex space-x-6">
                <span>Created At: </span>
                <span>{splitInfo.splitDate}</span>
              </div>
            </div>
          </div>
          <form
            method="dialog"
            className="flex pb-4 pr-4 justify-end space-x-6"
          >
            {deleting === false ? (
              <>
                <button
                  type="button"
                  onClick={closeHandle}
                  className="p-2 px-4 rounded-lg bg-blue-500 text-white"
                >
                  Cancel
                </button>
                <button
                  className="p-2 px-4 rounded-lg bg-red-500 text-white"
                  type="button"
                  onClick={deleteConfirmed}
                >
                  Confirm
                </button>
              </>
            ) : (
              <p className="text-lg font-medium">Deleting...</p>
            )}
          </form>
        </div>
      </dialog>
      <div className="hover:scale-105 duration-300 relative">
        <button
          onClick={deleteHandle}
          className="rounded-full absolute hover:scale-125 p-[1px] border-2 w-[25px] h-[25px] bg-black border-black duration-300 top-[10px] right-[10px]"
        >
          <i className="fi fi-ss-circle-xmark text-white rounded-full flex text-xl justify-center items-center"></i>
        </button>
        <button onClick={clickHandle} className={str}>
          <span className="rounded-full px-2 bg-white">
            {splitInfo.splitName}
          </span>
          <span className="text-lg px-2 font-medium rounded-full  bg-white">
            {splitInfo.splitDate}
          </span>
        </button>
      </div>
    </>
  );
}
