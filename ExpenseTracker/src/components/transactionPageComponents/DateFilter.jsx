import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../store/main";
import { useSelector } from "react-redux";
import DatePicker from "./DatePicker";

const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export default function DateFilter() {
  const dispatch = useDispatch();
  const filterParam = useSelector((state) => state.transactions.filterParam);
  const durations = useSelector((state) => state.transactions.durations);

  useEffect(() => {
    dispatch(transactionActions.clearDurations());
  }, []);

  function applyClick() {}

  function removeClick(ind) {
    dispatch(transactionActions.popDuration(ind));
  }

  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 rounded-r-xl p-4 px-8">
      <div className="font-semibold flex flex-col mt-[8px] mb-[20px] text-xl text-black text-center">
        <div className="mb-4 p-1 px-3 w-fit mx-auto rounded-md bg-[#9d4edd] text-white">
          {filterParam}
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col ">
          <div className="text-xl font-semibold mx-auto uppercase">
            {"add Duration(s)"}
          </div>
          <DatePicker />
        </div>

        <div className="flex flex-col px-4 items-center flex-grow gap-y-2  h-[400px]">
          <div className="text-xl w-full text-center font-semibold uppercase mb-12 pb-12 border-b-2 border-black">
            Preview
          </div>
          {durations.length === 0 ? (
            <p className="flex justify-center text-lg font-medium mt-12">
              No Durations
            </p>
          ) : (
            <>
              {durations.map((i, index) => {
                const date1 = `${
                  day[(i.first.getDay() + 6) % 7]
                } ${i.first.getDate()}/${
                  i.first.getMonth() + 1
                }/${i.first.getFullYear()}`;
                const date2 = `${
                  day[(i.second.getDay() + 6) % 7]
                } ${i.second.getDate()}/${
                  i.second.getMonth() + 1
                }/${i.second.getFullYear()}`;

                return (
                  <div
                    key={Math.random()}
                    className="flex py-1 w-fit rounded-md bg-[#9d4edd] text-white items-center space-x-1"
                  >
                    <div className="flex flex-grow space-x-2 px-4">
                      <span className="text-base font-medium  ">{date1}</span>
                      <span className="mx-2">-</span>
                      <span className="text-base font-medium text-right">
                        {date2}
                      </span>
                    </div>
                    <button
                      onClick={() => removeClick(index)}
                      className="pr-2 justify-center items-center"
                    >
                      <i className="fi fi-ss-cross-circle text-xl flex h-[30px] justify-center items-center"></i>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <Button
        disabled={durations.length === 0}
        className={durations.length > 0 ? "" : "disabled"}
        onClick={applyClick}
      >
        Apply
      </Button>
    </div>
  );
}