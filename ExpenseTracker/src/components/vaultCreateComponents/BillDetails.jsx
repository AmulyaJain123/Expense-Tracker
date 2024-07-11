import { useState, useRef, useEffect } from "react";
import ErrorElement from "./ErrorElement";
import { billAmountValidate } from "../../util/algo";
import { billDurationValidate } from "../../util/algo";
import { forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";

const BillDetails = forwardRef(function BillDetails({ ...prop }, ref) {
  const [warrantyStatus, setWarrantyStatus] = useState(false);
  const expireRef = useRef();
  const durationRef = useRef();
  const billDateRef = useRef();
  const billNameRef = useRef();
  const billTotalRef = useRef();
  const billDescRef = useRef();
  const [warrantyOption, setWarrantyOption] = useState(0);
  const [name, setName] = useState("");
  const [billdate, setBillDate] = useState("");
  const [total, setTotal] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [AmountError, setAmountError] = useState(null);
  const [expiryDateError, setExpiryDateError] = useState(null);
  const [expiryDurationError, setExpiryDurationError] = useState(null);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      getData() {
        const billName = name.trim();
        const billDate = new Date(billdate);
        billDate.setHours(0, 0, 0, 0);
        let billDesc = billDescRef.current.value.trim();
        if (billDesc === "") {
          billDesc = "None";
        }
        const billTotal = total;
        const createdOn = new Date();
        const warrantyAdded = warrantyStatus;
        let expireDate = null;
        let expireDuration = null;
        if (warrantyOption === 1) {
          expireDate = expireRef.current.value;
        } else if (warrantyOption === 2) {
          expireDuration = {
            days: durationRef.current.children[2].children[1].value,
            months: durationRef.current.children[1].children[1].value,
            years: durationRef.current.children[0].children[1].value,
          };
        }
        const obj = {
          billName,
          billDate,
          billDesc,
          billTotal,
          createdOn,
          warrantyAdded,
          expireDate,
          expireDuration,
        };
        return obj;
      },
    };
  });

  useEffect(() => {
    if (
      nameError != null ||
      dateError != null ||
      AmountError != null ||
      expiryDateError != null ||
      expiryDurationError != null ||
      name === "" ||
      billdate === "" ||
      total === "" ||
      (warrantyStatus && warrantyOption === 0)
    ) {
      dispatch(vaultActions.setDetailValidation(false));
    } else {
      dispatch(vaultActions.setDetailValidation(true));
    }
  }, [nameError, dateError, AmountError, expiryDateError, expiryDurationError, warrantyStatus, warrantyOption, name, billdate, total]);

  const date = new Date();
  const currDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  function warrantyClick() {
    setWarrantyOption(0);
    setWarrantyStatus((p) => !p);
  }

  function billNameChange(event) {
    setName(event.target.value);
    if (event.target.value === "") {
      setNameError("Bill Name cannot be empty.");
    } else {
      setNameError(null);
    }
  }
  function billDateChange(event) {
    setBillDate(event.target.value);
    if (event.target.value === "") {
      setDateError(null);
      return;
    }
    const dateEntered = new Date(event.target.value);
    if (dateEntered > new Date()) {
      setDateError("Bill Date cannot follow after Created-On Date.");
    } else if (
      warrantyStatus &&
      expireRef.current.value != "" &&
      dateEntered > new Date(expireRef.current.value)
    ) {
      setDateError("Bill Date cannot follow Expiration Date.");
    } else {
      setDateError(null);
    }
  }
  function billTotalChange(event) {
    setTotal(event.target.value);
    if (event.target.value === "") {
      setAmountError("Total Amount cannot be empty.");
      return;
    }
    if (!billAmountValidate(event.target.value)) {
      setAmountError("Total Amount is out of bounds.");
    } else {
      setAmountError(null);
    }
  }
  function billExpiryDateChange(event) {
    if (expireRef.current.value === "") {
      setWarrantyOption(0);
    } else {
      setWarrantyOption(1);
    }

    if (billDateRef.current.value === "" || event.target.value === "") {
      setExpiryDateError(null);
      return;
    }
    const billDate = new Date(billDateRef.current.value);
    if (billDate >= new Date(event.target.value)) {
      setExpiryDateError("Warranty Expiration cannot predate Bill Date.");
    } else {
      setExpiryDateError(null);
    }
  }

  function billDurationChange(event) {
    const year = durationRef.current.children[0].children[1];
    const month = durationRef.current.children[1].children[1];
    const day = durationRef.current.children[2].children[1];
    if (year.value === "" && month.value === "" && day.value === "") {
      setWarrantyOption(0);
      setExpiryDurationError(null);
      return;
    } else {
      setWarrantyOption(2);
    }
    if (
      billDurationValidate(year.value) &&
      billDurationValidate(month.value) &&
      billDurationValidate(day.value)
    ) {
      setExpiryDurationError(null);
    } else {
      setExpiryDurationError("Invalid Value Entered");
    }
  }

  return (
    <div className="bg-white zigzag w-[358px] pb-[100px]">
      <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[60px] text-2xl uppercase font-bold">
        Create Bill
      </div>

      <div className="flex h-[20px]">
        <div className="billCuts h-[20px] w-[20px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
          <div className="h-1/2 w-full  border-stone-300"></div>
        </div>
        <div className="billCuts h-[20px] w-[20px] rounded-l-full"></div>
      </div>

      <div className="flex flex-col mt-[60px]">
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Name
          </div>
          <input
            type="text"
            placeholder="Bill Name"
            ref={billNameRef}
            value={name}
            onChange={(event) => billNameChange(event)}
            className="flex p-2 px-4 text-center text-lg mx-4 mt-2 bg-slate-100"
          />
          <ErrorElement error={nameError} />
        </div>
        <div className="flex flex-col mb-[40px]">
          <div className="text-xl font-semibold flex justify-center">
            Created On
          </div>
          <input
            type="text"
            value={currDate}
            disabled
            className="flex p-2 px-4 text-center text-lg mx-4 mt-2 bg-slate-100"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Date
          </div>
          <input
            ref={billDateRef}
            value={billdate}
            onChange={billDateChange}
            type="date"
            className="p-2 px-4 text-lg text-center mx-4 mt-2 bg-slate-100"
          />
          <ErrorElement error={dateError} />
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Total
          </div>
          <input
            type="number"
            placeholder="Bill Total"
            ref={billTotalRef}
            value={total}
            onChange={billTotalChange}
            className="p-2 px-4 text-center text-lg mx-4 mt-2 bg-slate-100"
          />
          <ErrorElement error={AmountError} />
        </div>
        <div className="flex flex-col mb-[30px]">
          <div className="text-xl font-semibold flex justify-center">
            Description
          </div>
          <textarea
            placeholder="Description"
            ref={billDescRef}
            className="p-2 px-4 text-center resize-none h-[150px] text-lg mx-4 mt-2 bg-slate-100"
          />
        </div>
        <div className="flex flex-col">
          <button
            onClick={warrantyClick}
            className="text-xl mb-2 hover:bg-white border-2 border-black hover:text-black duration-500 bg-black text-white rounded-md h-fit px-4 py-1 mx-auto font-semibold items-center flex justify-center"
          >
            {warrantyStatus ? (
              <div className="flex items-center">
                <span className="text-3xl font-normal mr-2">-</span>{" "}
                <span className="text-lg">Remove Warranty</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-3xl font-normal mr-2">+</span>{" "}
                <span className="text-lg">Add Warranty</span>
              </div>
            )}
          </button>
          {warrantyStatus ? (
            <div className="flex flex-col">
              {warrantyOption === 0 ? (
                <p className="text-center">
                  Enter any one of following fields.
                </p>
              ) : null}
              <div className="flex flex-col mt-8">
                {warrantyOption != 2 ? (
                  <div className="flex flex-col">
                    <div className="text-xl font-semibold flex justify-center">
                      Warranty Expiration Date
                    </div>
                    <input
                      type="date"
                      onChange={billExpiryDateChange}
                      ref={expireRef}
                      className="p-2 px-4 text-lg text-center mx-4 mt-2 bg-slate-100"
                    />
                    <ErrorElement error={expiryDateError} />
                  </div>
                ) : null}

                {warrantyOption != 1 ? (
                  <div className="flex flex-col">
                    <div className="text-xl font-semibold flex justify-center">
                      Warranty Duration
                    </div>
                    <div
                      ref={durationRef}
                      className="mx-4 mt-2 flex w-[326px] space-x-2 text-lg"
                    >
                      <div className="flex flex-col w-[1/3] space-y-2">
                        <div className="flex justify-center">Year</div>
                        <input
                          onChange={billDurationChange}
                          className="bg-slate-100 p-1 w-full rounded-md"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col w-[1/3] space-y-2">
                        <div className="flex justify-center">Months</div>
                        <input
                          onChange={billDurationChange}
                          className="bg-slate-100 p-1 w-full rounded-md"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col w-[1/3] space-y-2">
                        <div className="flex justify-center">Days</div>
                        <input
                          onChange={billDurationChange}
                          className="bg-slate-100 p-1 w-full rounded-md"
                          type="number"
                        />
                      </div>
                    </div>
                    <ErrorElement error={expiryDurationError} />
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="text-center mt-2">No warranty Added</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default BillDetails;
