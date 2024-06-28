import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { formatVal } from "../util/algo";
import { amountInRange } from "../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";

const Textarea = styled.textarea`
  resize: none;
`;

const Button = styled.button`
  flex-grow: 1;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #38a169; /* bg-green-500 */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  border: 2px solid #38a169; /* border-2 border-green-500 */
  transition: all 0.5s; /* duration-500 */

  &:hover {
    background-color: white;
    color: #38a169; /* text-green-500 */
    transform: translateY(-5px); /* translate-y-[-5px] */
  }
`;

const Div = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 30px;
  }
`;

export default function DivideEquallySplitModal() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const [error, setError] = useState(null);
  const [checkedNo, setCheckedNo] = useState(friends.length);
  const checkboxRef = useRef();
  const selectRef = useRef();
  const amountRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const cancelRef = useRef();

  function resetPreview(no) {
    if (
      amountRef.current.value === "" ||
      parseFloat(amountRef.current.value) === 0 ||
      amountInRange(amountRef.current.value) === false
    ) {
      for (let i of checkboxRef.current.children) {
        i.children[0].children[1].innerText = "";
      }
      return;
    }
    const val = amountRef.current.value / no;
    const finalVal = formatVal(val);
    for (let i of checkboxRef.current.children) {
      if (i.children[1].children[0].checked === false) {
        continue;
      }
      i.children[0].children[1].innerText = finalVal;
    }
  }

  function addClick() {
    if (amountRef.current.value === "") {
      setError("Total Amount is mandatory.");
    } else if (amountRef.current.value === 0) {
      setError("Total Amount cannot be zero.");
    } else if (selectRef.current.value === "") {
      setError("Payer not Selected.");
    } else {
      const billName = nameRef.current.value;
      const billDate = dateRef.current.value;
      const desc = descRef.current.value;
      const totalAmt = amountRef.current.value;
      const payedBy = selectRef.current.value;
      const shares = [];
      for (let i of checkboxRef.current.children) {
        if (i.children[1].children[0].checked) {
          shares.push({
            name: i.children[1].children[0].value,
            share: totalAmt / checkedNo,
          });
        }
      }
      const obj = {
        id: Math.random(),
        billName,
        billDate,
        desc,
        totalAmt,
        payedBy,
        shares,
      };
      console.log(obj);
      dispatch(splitCreateActions.addBill(obj));
      cancelRef.current.click();
    }
  }

  function toggleCheckbox(event) {
    if (event.target.checked) {
      resetPreview(checkedNo + 1);
      setCheckedNo((preval) => {
        if (preval === 0) {
          setError(null);
        }
        return preval + 1;
      });
    } else {
      event.target.parentElement.parentElement.children[0].children[1].innerText =
        "";
      if (checkedNo === 1) {
        setError("No Shares Selected");
      }
      resetPreview(checkedNo - 1);
      setCheckedNo((preval) => preval - 1);
    }
  }

  function amountChange(event) {
    resetPreview(checkedNo);
    if (event.target.value === "") {
      setError("Total Amount is mandatory.");
    } else if (parseFloat(event.target.value) === 0) {
      setError("Total Amount cannot be zero.");
    } else if (amountInRange(event.target.value) === false) {
      setError("Total Amount value out of range.");
    } else if (
      error === "Total Amount is mandatory." ||
      error === "Total Amount cannot be zero." ||
      error === "Total Amount value out of range."
    ) {
      setError(null);
    }
  }

  function selectChange(event) {
    if (event.target.value === "") {
      setError("Payer not Selected.");
    } else if (error === "Payer not Selected.") {
      setError(null);
    }
  }

  function reset() {
    for (let i of checkboxRef.current.children) {
      i.children[1].children[0].checked = true;
      i.children[0].children[1].innerText = "";
    }
    nameRef.current.value = "";
    descRef.current.value = "";
    dateRef.current.value = "";
    amountRef.current.value = "";
    selectRef.current.value = "";
    setCheckedNo(friends.length);
    setError(null);
  }

  function cancelClick() {
    reset();
  }

  return (
    <div className="bg-stone-200 rounded-xl mt-4 flex flex-grow">
      <div className=" p-4 pr-2 flex flex-col w-1/2 h-fit">
        <div className="flex rounded-xl bg-white p-3">
          <div className="text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Bill Name
          </div>
          <input
            type="text"
            ref={nameRef}
            maxLength={20}
            placeholder="Type Name Here...(Optional)"
            className="rounded-md ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          />
        </div>
        <div className="flex mt-4 flex-col space-y-4 rounded-xl bg-white p-3">
          <div className="text-lg bg-black flex justify-center items-center font-semibold text-white py-2 px-6 rounded-lg">
            Description
          </div>
          <Textarea
            type="text"
            ref={descRef}
            placeholder="Write Here......(Optional)"
            className="text-md rounded-md h-[105px] bg-slate-100 flex-grow p-2 pl-4 text-lg"
          ></Textarea>
        </div>
        <div className="flex mt-4 rounded-xl bg-white p-3">
          <div className="text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Bill Date
          </div>
          <input
            type="date"
            ref={dateRef}
            className="rounded-md ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          />
        </div>
        <div className="flex mt-4 rounded-xl bg-white p-3">
          <div className="text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Total Amount
          </div>
          <input
            type="number"
            min={0}
            ref={amountRef}
            onChange={(event) => amountChange(event)}
            placeholder="Type Total Here ...."
            className="rounded-md ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          />
        </div>
        <div className="flex mt-4 rounded-xl bg-white p-3">
          <div className="text-lg bg-black  font-semibold text-white py-2 px-6 rounded-lg">
            Payed by
          </div>
          <select
            ref={selectRef}
            onChange={selectChange}
            className="rounded-md ml-4 bg-slate-100 flex-grow p-2 pl-6 text-md"
          >
            <option value="">Select Payer</option>
            {friends.map((friend) => {
              return (
                <option key={friend.name} value={friend.name}>
                  {friend.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className=" pl-2 p-4 flex flex-col w-1/2 flex-grow">
        <div className="flex flex-col rounded-xl bg-white h-[400px] p-3">
          <div className="text-lg bg-black flex justify-center items-center font-semibold text-white py-2 px-6 rounded-lg">
            Shares
          </div>
          <Div
            ref={checkboxRef}
            className="rounded-md mt-4 bg-slate-100 h-[500px] p-4 overflow-auto text-md"
          >
            {friends.map((friend) => {
              return (
                <div
                  key={friend.name}
                  className="flex mb-3 space-x-2 flex-grow"
                >
                  <label
                    htmlFor={friend.name}
                    className="p-3 pl-4 bg-white border-2 flex border-stone-200 rounded-md flex-grow"
                  >
                    <span className="flex-grow">{friend.name}</span>
                    <span className="w-auto text-right text-stone-400"></span>
                  </label>
                  <div className="p-3 rounded-md px-3 flex justify-center items-center bg-white border-2 border-stone-200">
                    <input
                      className="w-[20px] h-[20px]"
                      type="checkbox"
                      value={friend.name}
                      onClick={(event) => toggleCheckbox(event)}
                      defaultChecked
                      name={friend.name}
                      id=""
                    />
                  </div>
                </div>
              );
            })}
          </Div>
        </div>
        <div
          style={{
            display: `${error === null ? "none" : "flex"}`,
          }}
          className="bg-red-300 mt-auto text-sm items-center rounded-lg p-2 px-4"
        >
          <i className="fi fi-rs-exclamation mr-2 text-lg flex justify-center items-center"></i>
          <p>{error}</p>
        </div>
        <form method="dialog" className="flex space-x-3 mt-auto">
          <button
            onClick={cancelClick}
            ref={cancelRef}
            className="flex-grow p-3  flex justify-center items-center rounded-lg bg-red-500 text-white shadow-md hover:bg-white hover:text-red-500 border-2 border-red-500 hover:translate-y-[-5px] duration-500 "
          >
            Cancel
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="flex-grow p-3  flex justify-center items-center rounded-lg bg-blue-500 text-white shadow-md hover:bg-white hover:text-blue-500 border-2 border-blue-500 hover:translate-y-[-5px] duration-500 "
          >
            Reset
          </button>
          <Button
            disabled={error != null ? true : false}
            className={error != null ? "disabled" : ""}
            type="button"
            onClick={addClick}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
