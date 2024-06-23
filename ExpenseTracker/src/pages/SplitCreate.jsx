import Friends from "../components/Friends";
import Bills from "../components/Bills";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { styling } from "../util/styling";
import { splitAlgo } from "../util/algo";
import { useRef } from "react";
import SplitResultModal from "../components/SplitResultModal";

const SplitButton = styled.button`
  background-color: ${styling.GoToSplitButtonBgCol};
  display: flex;
  color: ${styling.GoToSplitButtonTextCol};
  border: ${"2px solid " + styling.GoToSplitButtonBgCol};
  border-radius: 0.5rem;
  margin-left: auto;
  padding: 8px;
  padding-left: 24px;
  padding-right: 24px;
  align-items: center;

  &:hover {
    background-color: ${styling.GoToSplitButtonTextCol};
    color: ${styling.GoToSplitButtonBgCol};
    transition: 500ms;
  }
`;

export default function SplitCreate() {
  const bills = useSelector((state) => state.splitCreate.bills);
  const modalRef = useRef();

  function splitClick() {
    const res = splitAlgo(bills);
    modalRef.current.open(res);
  }

  return (
    <>
      <SplitResultModal ref={modalRef} />
      <div className="flex">
        <Friends />
        <Bills />
      </div>
      <div className="my-16">
        <SplitButton
          onClick={splitClick}
          disabled={bills.length === 0 ? true : false}
          className={bills.length === 0 ? "disabled" : ""}
        >
          <span className="text-xl mr-2 ">Split</span>
          <span className="text-2xl">&#8658;</span>
        </SplitButton>
      </div>
    </>
  );
}
