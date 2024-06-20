import styled from "styled-components";
import { styling } from "../util/styling";
import BillModal from "./BillModal";
import { useRef } from "react";

const Main = styled.div`
  background-color: ${styling.friendsBoxBgCol};
`;

const Header = styled.div`
  background-color: ${styling.friendsTitleBgCol};
`;

const Button = styled.button`
  background-color: ${styling.friendsButtonBgCol};
  border: solid 1px black;
  &:hover {
    background-color: white;
    color: black;
    transition: 200ms;
  }
`;

export default function Bills() {
  const modalRef = useRef();
  function addBillClick() {
    modalRef.current.open();
  }

  return (
    <Main className="rounded-xl flex flex-col ml-[60px] shadow-md  w-full h-[700px]">
      <BillModal ref={modalRef} />
      <Header className="w-full py-4 flex justify-center items-center rounded-t-xl  text-xl font-bold uppercase">
        Bills
      </Header>

      <div className="w-full h-full p-6 overflow-auto"></div>

      <div className="flex w-full mx-auto max-w-[800px] h-[70px] p-2 mb-2">
        <Button
          onClick={addBillClick}
          className="text-white w-full rounded-md ml-auto"
        >
          Add a Bill
        </Button>
      </div>
    </Main>
  );
}
