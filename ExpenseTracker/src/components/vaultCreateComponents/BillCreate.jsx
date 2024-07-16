import { useState, useRef, useEffect } from "react";
import BillDetails from "./BillDetails";
import InputFile from "./InputFile";
import { DiscardBillButton } from "../../UIComponents/DiscardButton";
import { Button } from "../../UIComponents/NextButton";
import { useSelector } from "react-redux";
import { formatVal } from "../../util/algo";
import { useFirebase } from "../../store/firebase-context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import { universalActions } from "../../store/main";
import Loading from "../Loading";
export default function BillCreate() {
  const detailRef = useRef();
  const inputRef = useRef();
  const [loading, setLoading] = useState(null);
  const detailValidation = useSelector((state) => state.vault.detailValidation);
  const fileValidation = useSelector((state) => state.vault.fileValidation);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getExpiryDate(initialDate, expireDuration) {
    let currDate = new Date(initialDate);
    let { days, months, years } = expireDuration;

    while (years != 0) {
      let year = 365;
      let currY = currDate.getFullYear();
      if (
        (((currY % 100 != 0 && currY % 4 === 0) || currY % 400 === 0) &&
          (currDate.getMonth() + 1 < 3 ||
            (currDate.getMonth() + 1 === 2 && currDate.getDate() < 29))) ||
        ((((currY + 1) % 100 != 0 && (currY + 1) % 4 === 0) ||
          (currY + 1) % 400 === 0) &&
          currDate.getMonth() + 1 > 2)
      ) {
        year = 366;
      }
      const res = currDate.setDate(currDate.getDate() + year);
      currDate = new Date(res);
      console.log(currDate);
      years--;
    }
    while (months != 0) {
      let month = 30;
      const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let currY = currDate.getFullYear();
      let currM = currDate.getMonth();
      if ((currY % 100 != 0 && currY % 4 === 0) || currY % 400 === 0) {
        daysInMonths[1] = 29;
      }
      month = daysInMonths[currM];
      const res = currDate.setDate(currDate.getDate() + month);
      currDate = new Date(res);
      console.log(currDate);
      months--;
    }
    const res = currDate.setDate(currDate.getDate() + days);
    currDate = new Date(res);
    console.log(currDate);
    currDate.setHours(23, 59, 59, 0);
    return currDate;
  }

  async function saveHandle() {
    setLoading("Saving...");
    const res = detailRef.current.getData();
    const res1 = inputRef.current.getData();
    console.log(res, res1);
    let expiryDate = null;
    if (res.warrantyAdded) {
      if (res.expireDate != null) {
        expiryDate = new Date(res.expireDate);
        expiryDate.setHours(0, 0, 0, 0);
      } else {
        const days =
          res.expireDuration.days === ""
            ? 0
            : parseInt(res.expireDuration.days);
        const months =
          res.expireDuration.months === ""
            ? 0
            : parseInt(res.expireDuration.months);
        const years =
          res.expireDuration.years === ""
            ? 0
            : parseInt(res.expireDuration.years);
        res.expireDuration = { days, months, years };
        const billDate = new Date(res.billDate);
        expiryDate = getExpiryDate(billDate, { ...res.expireDuration });
      }
    }
    const data = {
      ...res,
      ...res1,
      expiryDate,
      billTotal: formatVal(res.billTotal),
    };
    const response = await firebase.addBill(data);
    setLoading(null);
    if (response.ok) {
      dispatch(universalActions.setToastMsg({msg:"Bill Saved Successfully!!",mood:"success"}));
      dispatch(vaultActions.clearAll());
      navigate("/vault");
    } else {
      dispatch(universalActions.setToastMsg({msg:"ERROR: Save Unsuccessful :(",mood:"error"}));
    }
  }

  return (
    <>
      <div className="mx-[100px] space-x-[50px] mt-[50px] p-4 text-stone-600 flex">
        <BillDetails ref={detailRef} />
        <InputFile ref={inputRef} />
      </div>
      {loading!=null ? (
        <Loading text={"Loading"} />
      ) : null}

      <div className="flex justify-between mx-16 mt-6 pr-8 mb-6">
        <DiscardBillButton>Discard</DiscardBillButton>
        {loading === null ? (
          <Button
            disabled={!(detailValidation && fileValidation)}
            onClick={saveHandle}
            className={
              (detailValidation && fileValidation) === false ? "disabled" : ""
            }
          >
            Save
          </Button>
        ) : (
          <p className="mx-[70px] font-semibold text-lg mt-[50] px-[20px] py-[12px] flex items-end">
            {loading}
          </p>
        )}
      </div>
    </>
  );
}
