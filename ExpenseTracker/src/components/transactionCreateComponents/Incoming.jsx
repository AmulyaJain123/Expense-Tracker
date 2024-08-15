import { useState, useRef } from "react";
import styled from "styled-components";
import { incomingTransactionCategories } from "../../util/componentNavigation";
import { Discard } from "../../UIComponents/DiscardButton";
import { Button } from "../../UIComponents/NextButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFirebase } from "../../store/firebase-context";
import Loading from "../Loading";
import { universalActions } from "../../store/main";
import styles from "./Incoming.module.css";

const Thumb = styled.button`
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "white"};
  color: ${(props) => (props.$status === "true" ? "white" : "black")};
  border: ${(props) =>
    props.$status === "true" ? "solid 2px #9d4edd" : "solid 2px #d6d3d1"};
  &:hover {
    scale: ${(props) => (props.$status === "true" ? "100%" : "110%")};
  }
`;

const Input = styled.input``;

export default function Incoming() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [category, setCategory] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const [toNameError, setToNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dateRef = useRef();
  const timeRef = useRef();
  const nameRef = useRef();
  const amountRef = useRef();
  const toNameRef = useRef();
  const [name, setName] = useState("");
  const [amt, setAmt] = useState("");
  const [toName, setToName] = useState("");
  const [date, setDate] = useState("");

  function formatDate(str) {
    if (parseInt(str) < 10) {
      const ret = "0" + str;
      return ret;
    } else {
      return str;
    }
  }
  // console.log(category);
  function categoryClick(event) {
    setCategory(event.target.innerText);
  }

  const today = `${formatDate(new Date().getFullYear())}-${formatDate(
    new Date().getMonth() + 1
  )}-${formatDate(new Date().getDate())}`;
  const time = `${formatDate(new Date().getHours())}:${formatDate(
    new Date().getMinutes()
  )}`;
  // console.log(today, time);

  function nameChange(event) {
    const name = event.target.value.trim();
    setName(name);
    if (name === "") {
      setNameError("Transaction name cannot be empty");
    } else {
      setNameError(null);
    }
  }

  function amountChange(event) {
    const amt = parseFloat(event.target.value);
    setAmt(amt);
    if (amt === "" || !amt || amt === 0 || amt < 0) {
      setAmountError("Transaction amount has to be positive");
    } else if (amt >= Number.MAX_VALUE) {
      setAmountError(
        `Transaction amount too large. Must lie in range (0,${Number.MAX_VALUE})`
      );
    } else {
      setAmountError(null);
    }
  }

  function toNameChange(event) {
    const name = event.target.value.trim();
    setToName(name);
    if (name === "") {
      setToNameError("Senders Name cannot be empty");
    } else {
      setToNameError(null);
    }
  }

  function checkDateTime() {
    let date = dateRef.current.value;
    let time = timeRef.current.value;
    const hours = parseInt(time.split(":")[0]);
    const mins = parseInt(time.split(":")[1]);
    // console.log(hours, mins);
    let dateTime = new Date(date);
    dateTime.setHours(hours, mins, 0, 0);
    // console.log(dateTime);
    if (dateTime > new Date()) {
      return false;
    }
    return true;
  }
  function getDateTime() {
    let date = dateRef.current.value;
    let time = timeRef.current.value;
    const hours = parseInt(time.split(":")[0]);
    const mins = parseInt(time.split(":")[1]);
    // // console.log(hours, mins);
    let dateTime = new Date(date);
    dateTime.setHours(hours, mins, 0, 0);
    // // console.log(dateTime);
    return dateTime;
  }

  function dateChange(event) {
    setDate(event.target.value);
    if (event.target.value === "") {
      setDateError("Date and Time Field cannot be empty");
    } else if (checkDateTime() === false) {
      setDateError("Transaction cannot be in future");
    } else {
      setDateError(null);
    }
  }

  function discardHandle() {
    navigate("/track");
  }

  function disableCheck() {
    if (
      nameError != null ||
      amountError != null ||
      toNameError != null ||
      dateError != null ||
      category === null ||
      nameRef.current.value === "" ||
      amountRef.current.value === "" ||
      toNameRef.current.value === "" ||
      dateRef.current.value === "" ||
      timeRef.current.value === ""
    ) {
      return true;
    }
    return false;
  }

  async function clickHandle() {
    setLoading(true);
    const obj = {
      transactionName: nameRef.current.value.trim(),
      transactionAmount: parseFloat(amountRef.current.value),
      from: toNameRef.current.value.trim(),
      to: "Me",
      dateTime: getDateTime(),
      transactionType: "Incoming",
      category: category,
    };
    // console.log(obj);
    const res = await firebase.addTransaction(obj);
    setLoading(false);
    if (res.ok) {
      dispatch(
        universalActions.setToastMsg({
          msg: "Transaction Saved Successfully!!",
          mood: "success",
        })
      );
      navigate("/track/dashboard");
    } else {
      dispatch(
        universalActions.setToastMsg({
          msg: "ERROR: Save Unsuccessful :(",
          mood: "error",
        })
      );
    }
  }

  return (
    <>
      <div className={`${styles.main} flex-col xl:flex-row`}>
        <div className="p-4 bg-white w-full xl:w-auto 2xl:min-w-[700px] max-w-[800px] flex flex-col space-y-4 rounded-xl">
          <div className="rounded-lg font-bold text-center bg-slate-100 p-3 uppercase">
            Transaction Info
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-4 p-4 rounded-lg bg-slate-100">
              <span className="p-2 px-6 text-center font-semibold text-lg text-white bg-black rounded-lg">
                Transaction Name
              </span>
              <Input
                className="flex-grow p-2 px-4 text-center bg-white  text-stone-600 rounded-lg text-lg"
                placeholder="Name....."
                $error={nameError != null ? "true" : "false"}
                onChange={(event) => nameChange(event)}
                type="text"
                ref={nameRef}
              />
            </div>
            <div className="flex-grow  flex items-center my-2 h-[30px]">
              {nameError != null ? (
                <div className="min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-sm text-center items-center px-3 rounded-md bg-red-300 text-black font-medium">
                  <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
                  <span>{nameError}</span>
                </div>
              ) : (
                <p className=" border-2 border-stone-300 border-dashed min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-xs sm:text-sm justify-center items-center px-3 tracking-wider font-medium rounded-md text-stone-300">
                  Error Box
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-4 p-4 rounded-lg bg-slate-100">
              <span className="p-2 px-6 text-center font-semibold text-lg text-white bg-black rounded-lg">
                Transaction Amount
              </span>
              <div className="flex space-x-4">
                <Input
                  className="flex-grow p-2 sm:pl-24 bg-white text-center  text-stone-600 rounded-lg text-lg"
                  type="number"
                  $error={amountError != null ? "true" : "false"}
                  onChange={(event) => amountChange(event)}
                  placeholder="Amount....."
                  min={"0"}
                  ref={amountRef}
                />
                <span className="p-2 px-4 bg-white hidden sm:flex text-stone-600 rounded-lg text-2xl font-bold items-center justify-center">
                  &#8377;
                </span>
              </div>
            </div>
            <div className="flex-grow  flex items-center my-2 h-[30px]">
              {amountError != null ? (
                <div className="min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-sm text-center items-center px-3 rounded-md bg-red-300 text-black font-medium">
                  <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
                  <span>{amountError}</span>
                </div>
              ) : (
                <p className=" border-2 border-stone-300 border-dashed min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-xs sm:text-sm justify-center items-center px-3 tracking-wider font-medium rounded-md text-stone-300">
                  Error Box
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div className="flex flex-col flex-auto space-y-4 p-4 rounded-lg bg-slate-100">
                  <span className="p-2 px-3 font-semibold text-lg text-white bg-black text-center rounded-lg">
                    From
                  </span>
                  <Input
                    className="flex-grow p-2 pl-4 text-center bg-white rounded-lg text-lg"
                    $error={toNameError != null ? "true" : "false"}
                    onChange={(event) => toNameChange(event)}
                    ref={toNameRef}
                    placeholder="Name....."
                    type="text"
                  />
                </div>
                <div className="flex flex-col flex-auto space-y-4 p-4 rounded-lg bg-slate-100">
                  <span className="p-2 px-3 font-semibold text-lg text-white bg-black text-center rounded-lg">
                    To
                  </span>
                  <Input
                    className="flex-grow p-2 text-center pl-4 bg-white  text-stone-600 rounded-lg text-lg"
                    value={"Me"}
                    disabled
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow  flex items-center my-2 h-[30px]">
              {toNameError != null ? (
                <div className="min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-sm text-center items-center px-3 rounded-md bg-red-300 text-black font-medium">
                  <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
                  <span>{toNameError}</span>
                </div>
              ) : (
                <p className=" border-2 border-stone-300 border-dashed min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-xs sm:text-sm justify-center items-center px-3 tracking-wider font-medium rounded-md text-stone-300">
                  Error Box
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div className="flex flex-col flex-1 space-y-4 p-4 rounded-lg bg-slate-100">
                  <span className="p-2 px-3 font-semibold text-lg text-white bg-black text-center rounded-lg">
                    Date
                  </span>
                  <Input
                    ref={dateRef}
                    className="flex-grow p-2 pl-4 bg-white text-stone-600 rounded-lg text-lg"
                    defaultValue={today}
                    $error={dateError != null ? "true" : "false"}
                    onChange={(event) => dateChange(event)}
                    type="date"
                  />
                </div>
                <div className="flex flex-col flex-1 space-y-4 p-4 rounded-lg bg-slate-100">
                  <span className="p-2 px-3 font-semibold text-lg text-white bg-black text-center rounded-lg">
                    Time
                  </span>
                  <Input
                    ref={timeRef}
                    className="flex-grow p-2 pl-4 bg-white  text-stone-600 rounded-lg text-lg"
                    type="time"
                    $error={dateError != null ? "true" : "false"}
                    onChange={(event) => dateChange(event)}
                    defaultValue={time}
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow  flex items-center my-2 h-[30px]">
              {dateError != null ? (
                <div className="min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-sm text-center items-center px-3 rounded-md bg-red-300 text-black font-medium">
                  <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
                  <span>{dateError}</span>
                </div>
              ) : (
                <p className=" border-2 border-stone-300 border-dashed min-h-[30px] mx-4 my-2 py-1 flex-grow flex text-xs sm:text-sm justify-center items-center px-3 tracking-wider font-medium rounded-md text-stone-300">
                  Error Box
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 h-fit bg-white max-w-[800px] flex-grow flex flex-col space-y-4 rounded-xl ">
          <div className="rounded-lg text-[28px] font-bold text-center bg-slate-100 p-3 uppercase">
            Category
          </div>
          {incomingTransactionCategories.map((cat) => {
            return (
              <div
                key={cat.name}
                className="flex flex-col space-y-4 p-4 rounded-lg bg-slate-100"
              >
                <div className="p-2 px-6 font-semibold text-center  text-white bg-black rounded-lg">
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.subCategories.map((subCategory) => {
                    return (
                      <Thumb
                        key={subCategory.name}
                        disabled={category === subCategory.name}
                        $status={
                          category === subCategory.name ? "true" : "false"
                        }
                        onClick={(event) => categoryClick(event)}
                        className="duration-500 p-1 px-2 flex space-x-3 items-center rounded-lg font-medium"
                      >
                        <img
                          className="w-[30px]"
                          src={subCategory.icon}
                          alt=""
                        />
                        <span className="flex items-center">
                          {subCategory.name}
                        </span>
                      </Thumb>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mx-[30px] scale-90 sm:scale-100 justify-between items-center mt-[20px]">
        <Discard onClick={discardHandle}>Discard</Discard>
        {loading ? (
          <p className="mx-[70px] font-semibold text-lg mt-[50px] pl-[10px] px-[20px] flex items-end">
            Saving....
          </p>
        ) : (
          <Button
            className={disableCheck() ? "disabled" : ""}
            disabled={disableCheck()}
            onClick={clickHandle}
          >
            Save
          </Button>
        )}
      </div>
      {loading ? <Loading text={"Loading"} /> : null}
    </>
  );
}
