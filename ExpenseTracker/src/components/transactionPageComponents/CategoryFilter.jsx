import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";
import { outgoingTransactionCategories } from "../../util/componentNavigation";
import { incomingTransactionCategories } from "../../util/componentNavigation";

const Button = styled.button`
  position: absolute;
  bottom: 2rem; /* bottom-8 */
  right: 2rem; /* right-8 */
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  border-radius: 0.75rem; /* rounded-xl */
  font-size: 1.125rem; /* text-lg */
  font-weight: 800; /* font-semibold */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
  border-width: 2px; /* border-[3px] */
  border-color: #38a3a5; /* border-[#2dc653] */
  background-color: #38a3a5; /* bg-[#2dc653] */
  color: #fff; /* text-[#f0fff1] */
  transition-property: background-color, color, transform; /* hover:bg-[#f0fff1] hover:text-[#2dc653] hover:scale-110 */
  transition-duration: 700ms; /* duration-700 */

  &:hover {
    background-color: #fff; /* hover:bg-[#f0fff1] */
    color: #38a3a5; /* hover:text-[#2dc653] */
    transform: scale(1.1); /* hover:scale-110 */
  }
`;

const Option = styled.button`
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "white"};
  color: ${(props) => (props.$status === "true" ? "white" : "black")};
  border: ${(props) =>
    props.$status === "true" ? "2px solid #9d4edd" : "2px solid #d6d3d1"};

  &:hover {
    scale: ${(props) => (props.$status === "true" ? "100%" : "110%")};
  }
`;

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const [names, setNames] = useState([]);

  function applyClick() {
    const arr = names.filter((i) => {
      return i.trim() != "" ? true : false;
    });
    const obj = { name: filterParam, options: [...arr] };
    // console.log(obj);
    dispatch(transactionActions.pushFilter(obj));
    dispatch(transactionActions.closeOpen());
  }

  function check(name) {
    const res = names.find((i) => i === name);
    if (res === undefined) {
      return false;
    }
    return true;
  }
  function clickHandle(event) {
    const token = event.target.innerText;
    const res = names.findIndex((i) => i === token);
    if (res === -1) {
      setNames((preval) => {
        return [...preval, token];
      });
    } else {
      setNames((preval) => {
        const arr = [...preval];
        arr.splice(res, 1);
        return [...arr];
      });
    }
  }

  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 rounded-r-xl p-4 px-16">
      <div className="font-semibold flex flex-col mt-[8px] mb-[40px] text-xl text-black text-center">
        <div className="mb-4 p-1 px-3 w-fit mx-auto rounded-md bg-[#9d4edd] text-white">
          {filterParam}
        </div>
      </div>
      <div className="text-xl font-semibold mx-auto mb-[10px] uppercase">
        {"Select categorie(s)"}
      </div>

      <div className="flex mx-4 py-4 border-y-2 border-stone-300 justify-center mt-4 flex-wrap gap-3">
        {outgoingTransactionCategories.map((i) => {
          return i.subCategories.map((j) => {
            return (
              <Option
                key={j.name}
                $status={check(j.name) ? "true" : "false"}
                onClick={(event) => clickHandle(event)}
                className="p-1 px-2 text-sm duration-500 flex space-x-3 items-center rounded-lg bg-white border-2 border-stone-400 "
              >
                <img className="w-[25px]" src={j.icon} alt="" />
                <span>{j.name}</span>
              </Option>
            );
          });
        })}
      </div>

      <div className="flex mx-4 pb-4 border-b-2 border-stone-300 mt-4 justify-center flex-wrap gap-3">
        {incomingTransactionCategories.map((i) => {
          return i.subCategories.map((j) => {
            return (
              <Option
                key={j.name}
                $status={check(j.name) ? "true" : "false"}
                onClick={(event) => clickHandle(event)}
                className="p-1 px-2 text-sm duration-500 flex space-x-3 items-center rounded-lg bg-white border-2 border-stone-400 "
              >
                <img className="w-[25px]" src={j.icon} alt="" />
                <span>{j.name}</span>
              </Option>
            );
          });
        })}
      </div>

      <Button
        disabled={names.length === 0}
        className={names.length > 0 ? "" : "disabled"}
        onClick={applyClick}
      >
        Apply
      </Button>
    </div>
  );
}
