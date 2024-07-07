import { useState, useRef, useEffect } from "react";
import BillDetails from "./BillDetails";
import InputFile from "./InputFile";
import { DiscardBillButton } from "../../UIComponents/DiscardButton";
import { Button } from "../../UIComponents/NextButton";
import { useSelector } from "react-redux";

export default function BillCreate() {
  const detailRef = useRef();
  const inputRef = useRef();
  const detailValidation = useSelector((state) => state.vault.detailValidation);
  const fileValidation = useSelector((state) => state.vault.fileValidation);

  return (
    <>
      <div className="mx-[100px] space-x-[50px] mt-[50px] p-4 text-stone-600 flex">
        <BillDetails ref={detailRef} />
        <InputFile ref={inputRef} />
      </div>
      <div className="flex justify-between mx-16 mt-6 mb-6">
        <DiscardBillButton>Discard</DiscardBillButton>
        <Button
          disabled={detailValidation && fileValidation}
          className={
            (detailValidation && fileValidation) === false ? "disabled" : ""
          }
        >
          Save
        </Button>
      </div>
    </>
  );
}
