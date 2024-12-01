import { useLoaderData } from "react-router-dom";
import BillPart from "../components/vaultViewComponents/BillPart";
import FileView from "../components/vaultViewComponents/FileView";
import { BackButton } from "../UIComponents/NextButton";
import { Discard } from "../UIComponents/DiscardButton";
import { Link } from "react-router-dom";
import { useFirebase } from "../store/firebase-context";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import MinimizedBillIcon from "../components/vaultViewComponents/MinimizedBillIcon";
import { formatDate } from "../util/algo";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";

export default function VaultBillView() {
  const data = useLoaderData();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const confirmRef = useRef();
  // console.log(data);

  function deleteHandle() {
    confirmRef.current.showModal();
  }

  async function deleteConfirmed() {
    setDeleting(true);
    const res = await firebase.deleteBill(data.bill.billId);
    confirmRef.current.close();
    setDeleting(false);
    if (res.ok) {
      dispatch(
        universalActions.setToastMsg({
          msg: "Bill Deleted Successfully!!",
          mood: "success",
        })
      );
      navigate("/vault/view");
    } else {
      dispatch(
        universalActions.setToastMsg({
          msg: "Full Delete Unsuccessful :(",
          mood: "error",
        })
      );
    }
  }

  function closeHandle() {
    confirmRef.current.close();
  }

  return (
    <>
      <dialog
        ref={confirmRef}
        className="rounded-2xl scale-[70%] md:scale-[80%] xl:scale-100"
      >
        <div className="rounded-xl   sm:w-[600px] bg-stone-100">
          <h1 className="p-4 sm:pl-[30px] text-center sm:text-start  text-lg sm:text-xl font-medium">
            Are you sure you want to delete the selected Bill ?
          </h1>
          <div className="flex  justify-center mb-[20px] sm:mb-0 sm:space-x-[120px] px-[50px]">
            <MinimizedBillIcon
              name={data.bill.billName}
              date={formatDate(data.bill.billDate)}
            />
            <div className="hidden sm:flex flex-col mt-[35px] space-y-2">
              <div className="flex space-x-6">
                <span>Bill Name: </span>
                <span>{data.bill.billName}</span>
              </div>
              <div className="flex space-x-6">
                <span>Bill Date: </span>
                <span>{formatDate(data.bill.billDate)}</span>
              </div>
            </div>
          </div>
          <form
            method="dialog"
            className="flex pb-4 sm:pr-4 justify-center sm:justify-end space-x-6"
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

      <div className="h-full w-full billViewBg overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <div className=" flex-col items-center xl:items-stretch space-y-20 xl:space-y-0  xl:flex-row justify-center xl:space-x-[50px] mt-[50px] px-2 p-4 text-stone-600 flex">
          <BillPart data={data.bill} />
          <FileView data={data.images} />
        </div>
        <div className="mx-[10px] scale-[90%] sm:scale-100 sm:mx-[50px] flex flex-col sm:flex-row justify-between items-center mt-[50px]">
          <Link to={"/vault/view"}>
            <BackButton>{"<<-- Vault"}</BackButton>
          </Link>
          <Discard onClick={deleteHandle}>Delete</Discard>
        </div>
      </div>
    </>
  );
}
