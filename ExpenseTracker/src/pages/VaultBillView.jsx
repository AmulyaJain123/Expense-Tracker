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

export default function VaultBillView() {
  const data = useLoaderData();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const confirmRef = useRef();
  console.log(data);

  function deleteHandle() {
    confirmRef.current.showModal();
  }

  async function deleteConfirmed() {
    setDeleting(true);
    const res = await firebase.deleteBill(data.bill.billId);
    confirmRef.current.close();
    setDeleting(false);
    if (res.ok) {
      alert("Bill Deleted Successfully!!");
      navigate("/vault/view");
    } else {
      alert("Full Delete Unsuccessful : (");
    }
  }

  function closeHandle() {
    confirmRef.current.close();
  }

  return (
    <>
      <dialog ref={confirmRef} className="rounded-2xl">
        <div className="rounded-xl w-[600px] bg-stone-100">
          <h1 className="p-4 pl-[30px] text-xl font-medium">
            Are you sure you want to delete the selected Bill ?
          </h1>
          <div className="flex space-x-[120px] px-[50px]">
            <MinimizedBillIcon
              name={data.bill.billName}
              date={formatDate(data.bill.billDate)}
            />
            <div className="flex flex-col mt-[35px] space-y-2">
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
      <div className="h-full w-full billViewBg overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <div className="mx-[100px] justify-center space-x-[50px] mt-[50px] p-4 text-stone-600 flex">
          <BillPart data={data.bill} />
          <FileView data={data.images} />
        </div>
        <div className="mx-[50px] flex justify-between items-center mt-[50px]">
          <Link to={"/vault/view"}>
            <BackButton>{"<<-- Vault"}</BackButton>
          </Link>
          <Discard onClick={deleteHandle}>Delete</Discard>
        </div>
      </div>
    </>
  );
}
