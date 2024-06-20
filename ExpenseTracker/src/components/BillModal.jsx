import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";
import { useState } from "react";
import styled from "styled-components";

const BillModal = forwardRef(function BillModal({ ...rest }, ref) {
  const friends = useSelector((state) => state.splitCreate.friends);
  const dispatch = useDispatch();
  const dialog = useRef();
  const shareRef = useRef();
  const totalAmtRef = useRef();
  const payerRef = useRef();
  const [error, setError] = useState(null);

  // const Error = styled.div`
  //   display: ${error === null ? "none" : "block"};
  // `;

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // useEffect(() => {
  //   setCount(friends.length);
  // }, [friends]);

  // function clickHandle(event) {
  //   const num = event.target.checked === false ? -1 : 1;
  //   setCount((preval) => {
  //     console.log(preval);
  //     const newval = preval + num;
  //     return newval;
  //   });
  // }

  function SaveClick() {
    if (
      totalAmtRef.current.value === "" ||
      parseInt(totalAmtRef.current.value) === 0
    ) {
      setError("Total Bill Value must be positive.");
      return;
    } else if (payerRef.current.value === "") {
      setError("Payer value is Incorrect.");
      return;
    } else {
      let total = 0;
      const arr = [];
      for (let i of shareRef.current.children) {
        const checkboxStatus = i.children[0].checked;
        const friendName = i.children[0].value;
        const share = i.children[2].value;
        if (checkboxStatus === false) {
          continue;
        } else if (share === "" || parseInt(share) === 0) {
          const str = `Checked entity cannot have zero share. ${friendName} is checked but share is zero.`;
          setError(str);
          return;
        } else {
          total += parseFloat(share);
          arr.push({
            name: friendName,
            share: share,
          });
        }
      }
      if (total != totalAmtRef.current.value) {
        const str = `Total does not match the Shares. Shares are ${total}. Difference of ${
          total - totalAmtRef.current.value
        }`;
        setError(str);
        return;
      }
      const data = {
        total: totalAmtRef.current.value,
        payer: payerRef.current.value,
        shares: arr,
      };
      console.log(data);
      dispatch(splitCreateActions.addBill(data));
    }
  }

  function cancelClick() {
    setError(null);
  }

  return (
    <dialog
      ref={dialog}
      className="w-[90vw] max-w-[1000px] h-[90vh] p-[50px] bg-slate-300 rounded-3xl"
    >
      <div className="flex w-full h-full">
        <div className="w-full h-full mr-8">
          <div className="rounded-t-xl rounded-bl-xl flex flex-col w-full h-full  bg-slate-400">
            <div className="text-2xl pt-3 rounded-t-xl bg-slate-100 w-full text-center font-semibold p-2 ">
              Manage Share
            </div>
            <ul ref={shareRef} className="flex-grow pt-5 overflow-auto">
              {friends.map((obj) => {
                return (
                  <li
                    key={obj.name}
                    className="mb-3 text-lg flex items-center p-2 mx-5"
                  >
                    <input
                      className="w-[20px] mr-16 h-[20px]"
                      name="check"
                      type="checkbox"
                      defaultChecked
                      value={obj.name}
                    />
                    <label htmlFor="check">{obj.name}</label>
                    <input
                      type="number"
                      min="0"
                      className="w-[150px] p-1 px-2 rounded-md ml-auto"
                      placeholder="0.00 &#8377;"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="w-[50%] max-w-[400px] h-full flex flex-col">
          <div className="p-2 flex flex-col items-center bg-slate-400 rounded-xl">
            <label
              className="text-2xl w-56 text-center font-semibold p-2 "
              htmlFor="total"
            >
              Total Bill Value
            </label>
            <input
              className="rounded-md my-4 w-[80%] flex-grow p-2"
              name="total"
              type="number"
              min="0"
              ref={totalAmtRef}
              placeholder="0.00 &#8377;"
            />
          </div>

          <div className="p-2 mt-12 flex w-full flex-col items-center bg-slate-400 rounded-xl">
            <label
              className="text-2xl  text-center font-semibold p-2 "
              htmlFor="payer"
            >
              Payer
            </label>
            <select
              ref={payerRef}
              className="rounded-md mt-4 mb-4 w-[80%] flex-grow  p-2"
              name="payer"
            >
              <option value="">Select Payer</option>
              {friends.map((obj) => {
                return (
                  <option key={obj.name} value={obj.name}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            style={{ display: `${error === null ? "none" : "block"}` }}
            className="bg-red-300 w-full my-3 rounded-xl p-3 h-full"
          >
            <h2 className="text-center mb-1">ERROR</h2>
            <p>{error}</p>
          </div>
          <form className="flex  mt-auto gap-x-2" method="dialog">
            <button
              className="w-[50%] py-2 text-white font-semibold hover:bg-white mr hover:text-red-500 border-red-500 border-[2px] duration-[0.5s] rounded-lg bg-red-500 text-lg "
              onClick={cancelClick}
            >
              Cancel
            </button>
            <button
              className="w-[50%] py-2 text-white font-semibold hover:bg-white hover:text-green-500 border-green-500 border-[2px] duration-[0.5s] rounded-lg bg-green-500 text-lg "
              onClick={SaveClick}
              type="button"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default BillModal;
