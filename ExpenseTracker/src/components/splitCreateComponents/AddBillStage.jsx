import { BackButton, Button } from "../../UIComponents/NextButton";
import AddBillNavThumbs from "../../UIComponents/AddBillNavThumbs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { styling } from "../../util/styling";
import BillModal from "./BillModal";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import loading from "../../assets/loadingLiq.gif";
import {
  addBillHeirarchy,
  createSplitHeirachy,
} from "../../util/componentNavigation";
import BillComponent from "./BillComponent";
import { splitAlgo } from "../../util/algo";
import DiscardButton from "../../UIComponents/DiscardButton";

export default function AddBillStage() {
  const modalRef = useRef();
  const bills = useSelector((state) => state.splitCreate.bills);
  const [spliting, setSpliting] = useState(false);
  const selectBillNavStatus = useSelector(
    (state) => state.splitCreate.selectBillNavStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  function addBillClick() {
    dispatch(splitCreateActions.changeAddBillNavStatus(addBillHeirarchy[0]));
    modalRef.current.open();
  }

  function handleBackClick() {
    dispatch(
      splitCreateActions.changeTopNavEventStatus(createSplitHeirachy[0])
    );
  }

  function disable() {
    if (bills.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  function clickHandler() {
    setSpliting(true);
    setTimeout(() => {
      splitAlgo(bills);
      dispatch(
        splitCreateActions.changeTopNavEventStatus(createSplitHeirachy[2])
      );
      setSpliting(false);
    }, 3000);
  }

  return (
    <>
      <div className="flex justify-end">
        <DiscardButton>Discard</DiscardButton>
      </div>
      {spliting ? (
        <div className="absolute bg-black/40 top-0 bottom-0 flex justify-center items-center left-0 right-0">
          <div className="flex flex-col w-[300px] rounded-xl bg-white  p-6">
            <div className="text-2xl font-semibold flex justify-center">
              Spliting....
            </div>
            <div className="py-[30px] mx-auto">
              <img src={loading} className="w-[200px]" alt="" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-[900px] bg-[#fff] flex flex-col p-4 rounded-xl mt-8  mx-auto ">
        <BillModal ref={modalRef} />
        <header
          id="title"
          style={{}}
          className="text-[30px] font-extrabold uppercase justify-center mb-4 flex items-center rounded-lg bg-slate-100 py-5 px-5"
        >
          Add Bills
        </header>
        <div className="text-lg flex flex-col text-stone-500  rounded-lg bg-slate-100 ">
          {bills.length === 0 ? (
            <p className="flex flex-grow justify-center pt-8">
              {" "}
              No Bills Added
            </p>
          ) : (
            <div className="border-b-2 border-white gap-y-2 gap-x-2 p-4 flex flex-wrap flex-grow ">
              {bills.map((bill) => {
                return (
                  <AddBillNavThumbs
                    key={bill.id}
                    viewOnly="false"
                    status={bill.id === selectBillNavStatus ? "true" : "false"}
                    identity={bill.id}
                  >
                    {bill.billName}
                  </AddBillNavThumbs>
                );
              })}
            </div>
          )}
          <div className="p-4 w-full h-[560px] overflow-auto">
            {bills.length === 0 ? null : selectBillNavStatus === null ? (
              <p className="text-center">No Bill Selected</p>
            ) : (
              <BillComponent id={selectBillNavStatus} />
            )}
          </div>
        </div>
        <button
          onClick={addBillClick}
          className="rounded-lg hover:bg-white border-2 border-black hover:text-black duration-500 bg-black text-white uppercase font-semibold flex flex-grow p-3 justify-center items-center mt-4 "
        >
          Add a Bill
        </button>
      </div>
      <div className="flex justify-between">
        <BackButton onClick={handleBackClick}>{"<<-- Back"}</BackButton>
        <Button
          disabled={disable() ? true : false}
          className={disable() ? "disabled" : ""}
          onClick={clickHandler}
        >
          {"Split -->>"}
        </Button>
      </div>
    </>
  );
}
