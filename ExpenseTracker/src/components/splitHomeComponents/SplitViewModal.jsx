import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { styling } from "../../util/styling";
import SingleBill from "./SingleBill";
import styles from "./SplitViewModal.module.css";

const Thumb = styled.button`
  transition: all 500ms;
  border-radius: 6px;
  padding: 4px 12px;
  justify-content: center;
  border: ${(props) =>
    props.$status === "true"
      ? `2px solid ${"#9d4edd"}`
      : `2px solid ${styling.backColor}`};
  display: flex;
  align-items: center;
  color: ${(props) => (props.$status === "true" ? "#f7ebfd" : "black")};
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "white"};
  &:hover {
    scale: ${(props) => {
      return props.$status === "true" ? "100%" : "105%";
    }};
    transition: all 500ms;
  }
`;

const SplitViewModal = forwardRef(function SplitViewModal({ ...props }, ref) {
  const modalRef = useRef();
  const [selectedBill, setSelectedBill] = useState(null);

  const {
    createdAt,
    splitInfo,
    registeredFriends,
    transactionToLiquidate,
    expenditure,
    bills,
  } = props.data;

  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
        modalRef.current.children[0].children[1].scroll({
          top: 0,
          behaviour: "smooth",
        });
      },
    };
  });

  useEffect(() => {
    // console.log("sdfsfef");
  }, []);

  function changeSelectedBill(id) {
    setSelectedBill(id);
  }

  function getBill() {
    const reqBill = bills.find((bill) => {
      return bill.billId === selectedBill ? true : false;
    });
    return reqBill;
  }

  return (
    <dialog className="rounded-3xl relative" ref={modalRef}>
      <div className={`${styles.main} splitViewBg`}>
        <header className="text-lg md:text-[30px] p-4 mt-8 text-center mx-[20px] md:mx-[100px] text-white bg-[#9F21E3]  rounded-xl  font-extrabold">
          {"SPLIT SUMMARY (View Only)"}
        </header>

        <div className="flex-grow sm:customScroll w-full overflow-auto px-[5px] sm:px-[20px] md:px-[100px] pt-[10px] flex space-y-4 flex-col mt-4">
          <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
            <div className="rounded-xl sm:min-w-[300px] bg-white  flex items-center p-3">
              <div className="rounded-xl  bg-[#F7EBFD] border-2 border-dashed border-stone-300 flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Split Name
                </menu>
                <div className="rounded-lg h-[80px] font-medium flex-auto py-2 mt-2 flex justify-center items-center text-stone-400">
                  {splitInfo.splitName}
                </div>
              </div>
            </div>
            <div className="rounded-xl sm:min-w-[300px]  bg-white  flex items-center p-3 ">
              <div className="rounded-xl bg-[#F7EBFD] border-2 border-dashed border-stone-300 flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Split Created On
                </menu>
                <div className="rounded-lg h-[80px] font-medium  py-2 mt-2 flex justify-center items-center text-stone-400">
                  {splitInfo.splitDate}
                </div>
              </div>
            </div>
            <div className="rounded-xl flex-grow bg-white flex items-center p-3 ">
              <div className="rounded-xl  bg-[#F7EBFD] border-2 border-dashed border-stone-300 flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Split Description
                </menu>
                <div className="rounded-lg h-[80px] p-4 font-medium flex text-center justify-center items-center   mt-2  text-stone-400">
                  {splitInfo.splitDesc}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
            <div className="rounded-xl bg-white flex-col space-y-3 p-3  xl:w-[350px]   h-[500px]">
              <div className="rounded-xl  bg-[#F7EBFD] border-2 border-dashed border-stone-300 h-full flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Registered Friends
                </menu>
                <div className=" customScrollThin rounded-lg overflow-auto   py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                  {registeredFriends.map((friend, index) => {
                    return (
                      <li
                        key={friend}
                        className="mb-4 px-4 min-w-[400px] sm:min-w-0 flex w-full  "
                      >
                        <div className="min-w-[50px]">
                          <span className="bg-[#fff] flex justify-center items-center w-[35px] h-[35px] rounded-lg ">
                            {index + 1}
                          </span>
                        </div>
                        <span className="bg-[#fff] flex-grow  flex px-4 items-center h-[35px] rounded-lg ">
                          <span>{friend}</span>
                        </span>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="rounded-xl flex-grow bg-white flex-col space-y-3 p-3 xl:w-[400px]   h-[500px]">
              <div className="rounded-xl bg-[#F7EBFD] border-2 border-dashed border-stone-300 h-full flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex text-center justify-center items-center">
                  Transactions to Liquidate
                </menu>
                <div className="customScrollThin rounded-lg  overflow-auto overflow-x-scroll font-medium flex-grow  py-2 pt-4 mt-4 flex flex-col text-stone-400">
                  {transactionToLiquidate.map((transaction) => {
                    return (
                      <li
                        key={Math.random()}
                        className="mb-4 px-2 flex w-full min-w-[450px] sm:min-w-0"
                      >
                        <div className="w-[200px]">
                          <span className="bg-[#fff] flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                            {transaction.sender}
                          </span>
                        </div>
                        <div className="w-[200px]">
                          <span className="flex w-fit px-2 mx-auto items-center h-[35px]">
                            Pays
                          </span>
                        </div>
                        <div className="w-[200px]">
                          <span className="bg-[#fff] ml-auto flex w-fit px-2 justify-center items-center h-[35px] rounded-lg ">
                            {transaction.reciever}
                          </span>
                        </div>
                        <div className="w-[190px] ml-[100px]">
                          <span className="bg-[#fff] px-2 ml-auto flex w-fit justify-center items-center h-[35px] rounded-lg ">
                            {transaction.amt}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
            <div className="rounded-xl bg-white flex-col space-y-3 p-3 xl:w-[400px]   h-[500px] xl:h-[740px]">
              <div className="rounded-xl h-full bg-[#F7EBFD] border-2 border-dashed border-stone-300 flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Expenditure
                </menu>
                <div className="customScrollThin rounded-lg overflow-auto  flex-grow  py-2 pt-4 mt-4 flex font-medium flex-col text-stone-400">
                  {expenditure.map((obj) => {
                    return (
                      <li
                        key={obj.name}
                        className="mb-4 flex w-full min-w-[400px] sm:min-w-0 justify-between  "
                      >
                        <div className="">
                          <span className="bg-[#fff] flex justify-center items-center px-2 w-fit h-[35px] rounded-lg ">
                            {obj.name}
                          </span>
                        </div>
                        <span className="bg-[#fff] flex px-2 items-center h-[35px] rounded-lg ">
                          {obj.amt}
                        </span>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-grow bg-[#fff] flex flex-col p-3   rounded-xl ">
              <div className="rounded-xl bg-[#F7EBFD] border-2 border-dashed border-stone-300 flex p-3 flex-grow flex-col">
                <menu className="rounded-lg bg-[#9F21E3] text-[#F7EBFD] font-semibold text-xl py-2 flex justify-center items-center">
                  Registered Bills
                </menu>
                <div className=" rounded-lg    py-2 flex font-medium flex-col text-stone-400">
                  <div className="  flex flex-col text-stone-500  rounded-lg  ">
                    <div className="border-b-2 border-white gap-y-2 gap-x-2 p-4 flex flex-wrap flex-grow ">
                      {bills.map((bill) => {
                        // console.log(bill);
                        return (
                          <Thumb
                            key={bill.billId}
                            onClick={() => changeSelectedBill(bill.billId)}
                            $status={
                              selectedBill === bill.billId ? "true" : "false"
                            }
                          >
                            {bill.billName}
                          </Thumb>
                        );
                      })}
                    </div>

                    <div className="p-4 w-full customScrollThin overflow-auto">
                      {selectedBill === null ? (
                        <p className="text-center">No Bill Selected</p>
                      ) : (
                        <SingleBill data={getBill()} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form method="dialog">
          <button className="absolute right-[15px] top-[15px]">
            <i className="fi fi-ss-circle-xmark flex text-[40px] justify-center items-center"></i>
          </button>
        </form>
      </div>
    </dialog>
  );
});

export default SplitViewModal;
