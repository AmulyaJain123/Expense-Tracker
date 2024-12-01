import { useRef, useState } from "react";
import SplitViewModal from "./SplitViewModal";
import { useFirebase } from "../../store/firebase-context";
import MinimizedSplit from "./MinimizedSplit";
import { useDispatch } from "react-redux";
import { universalActions } from "../../store/main";

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
  const dispatch = useDispatch();

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
      // alert("");
      dispatch(
        universalActions.setToastMsg({
          msg: "Split Deleted Succesfully!!",
          mood: "success",
        })
      );
    } else {
      // alert("");
      dispatch(
        universalActions.setToastMsg({
          msg: "ERROR: Delete Unsuccessful :(",
          mood: "error",
        })
      );
      confirmRef.current.close();
      return;
    }
    setSplitState((preval) => {
      const retVal = preval.filter((x) => x.docId != docId);
      // console.log(retVal);
      return retVal;
    });
  }
  const str =
    "text-black border-[1px] sm:border-2 border-stone-600 flex flex-col space-y-2 sm:space-y-4 text-xl font-semibold justify-center items-center rounded-xl w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] " +
    bgPattern;
  return (
    <>
      <SplitViewModal data={data} ref={modalRef} />
      <dialog ref={confirmRef} className="rounded-2xl scale-90 lg:scale-100">
        <div className="rounded-xl sm:w-[600px] bg-stone-100">
          <h1 className="p-4 sm:pl-[30px] text-lg text-center sm:text-start sm:text-xl font-medium">
            Are you sure you want to delete the following Split ?
          </h1>
          <div className="flex justify-center sm:justify-start space-x-[50px] px-[50px]">
            <MinimizedSplit
              name={splitInfo.splitName}
              date={splitInfo.splitDate}
              bgPattern={bgPattern}
            />
            <div className=" hidden sm:flex flex-col mt-[50px] space-y-2">
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
            className="flex pb-4 sm:pr-4 mt-4 sm:mt-0 scale-90 sm:scale-100 justify-center sm:justify-end space-x-6"
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
          className="rounded-full absolute hover:scale-125 p-[1px] border-2 sm:w-[25px] sm:h-[25px] bg-black border-black duration-300 top-[5px] right-[5px] sm:top-[10px] sm:right-[10px]"
        >
          <i className="fi fi-ss-circle-xmark text-white rounded-full flex text-base sm:text-xl justify-center items-center"></i>
        </button>
        <button onClick={clickHandle} className={str}>
          <span className="rounded-full text-xs sm:text-xl px-1 sm:px-2 bg-white">
            {splitInfo.splitName}
          </span>
          <span className=" px-1 sm:px-2 text-xs sm:text-xl font-medium rounded-full  bg-white">
            {splitInfo.splitDate}
          </span>
        </button>
      </div>
    </>
  );
}
