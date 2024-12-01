import Friends from "./Friends";
import { useSelector } from "react-redux";
import { splitAlgo } from "../../util/algo";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { useRef, useState, useEffect } from "react";
import { createSplitHeirachy } from "../../util/componentNavigation";
import { Button } from "../../UIComponents/NextButton";
import DiscardButton from "../../UIComponents/DiscardButton";
import styles from "./CreateSplitStage.module.css";

export default function CreateSplitStage() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.splitCreate.friends);
  const [valid, setValid] = useState(false);
  const descRef = useRef();
  const nameRef = useRef();
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);

  const currentStatus = useSelector(
    (state) => state.splitCreate.topNavSplitStatus
  );

  useEffect(() => {
    if (nameRef.current.value != "") {
      setValid(true);
    }
    document
      .getElementById("Top")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, []);

  function splitClick() {
    const res = splitAlgo(bills);
    modalRef.current.open(res);
  }

  function disable() {
    if (friends.length > 1 && valid) {
      return false;
    }
    return true;
  }

  function changeHandler(event) {
    if (event.target.value != "") {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  function clickHandler() {
    const splitName = nameRef.current.value.trim();
    const desc = descRef.current.value.trim();
    // console.log(desc);
    dispatch(splitCreateActions.setSplitInfo({ name: splitName, desc: desc }));
    const ind = createSplitHeirachy.indexOf(currentStatus);
    const str = createSplitHeirachy[ind + 1];
    // console.log(str);
    dispatch(splitCreateActions.changeTopNavEventStatus(str));
  }

  return (
    <>
      <div className="flex scale-[80%] sm:scale-100 justify-center sm:justify-end">
        <DiscardButton>Discard</DiscardButton>
      </div>
      <div className={`${styles.main}`}>
        <header
          style={{}}
          className=" text-[20px] sm:text-[25px] xl:text-[30px] font-extrabold uppercase justify-center mb-4 flex items-center rounded-lg bg-slate-100 py-2 sm:py-3 xl:py-5 px-5"
        >
          Create a Split
        </header>
        <div className=" text-sm sm:text-base xl:text-lg mb-4 flex flex-col space-y-3 sm:space-y-0  items-stretch  sm:flex-row text-stone-500 sm:items-center rounded-lg bg-slate-100 p-3">
          <span className="rounded-md bg-[#000] text-white text-center sm:text-start  sm:mr-3 p-2 font-semibold px-[20px]">
            Split Name
          </span>
          <input
            type="text"
            ref={nameRef}
            maxLength={40}
            defaultValue={splitInfo.splitName != "" ? splitInfo.splitName : ""}
            placeholder="Name...."
            onChange={(event) => changeHandler(event)}
            className="rounded-md text-md text-center sm:text-start px-6 flex-grow p-2 bg-white "
          />
        </div>
        <div className="text-sm sm:text-base xl:text-lg mb-4 flex flex-col space-y-3 sm:space-y-0 sm:flex-row items-stretch text-stone-500 sm:items-center rounded-lg bg-slate-100 p-3">
          <span className="text-center sm:text-start rounded-md bg-[#000] text-white  sm:mr-3 p-2 font-semibold px-[20px]">
            Description
          </span>
          <input
            ref={descRef}
            type="text"
            maxLength={70}
            defaultValue={
              splitInfo.description != "" ? splitInfo.description : ""
            }
            placeholder="Desc(Optional)...."
            className="text-center sm:text-start rounded-md text-md px-6 flex-grow p-2 bg-white "
          />
        </div>
        <Friends />
      </div>
      <div className="flex scale-[80%] sm:scale-100 justify-center sm:justify-end">
        <Button
          disabled={disable() ? true : false}
          className={disable() ? "disabled" : ""}
          onClick={clickHandler}
        >
          {"Next -->>"}
        </Button>
      </div>
    </>
  );
}