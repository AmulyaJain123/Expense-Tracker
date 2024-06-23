import styled from "styled-components";
import { styling } from "../util/styling";
import BillModal from "./BillModal";
import { useRef } from "react";
import { useSelector } from "react-redux";
import BillComponent from "./BillComponent";

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
  const friends = useSelector((state) => state.splitCreate.friends);
  const bills = useSelector((state) => state.splitCreate.bills);
  console.log(bills);

  function addBillClick() {
    modalRef.current.open();
  }

  return (
    <Main className="rounded-xl flex flex-col ml-[60px] min-w-[500px] shadow-md  w-full h-[700px]">
      <BillModal ref={modalRef} />
      <Header className="w-full py-4 flex justify-center items-center rounded-t-xl  text-xl font-bold uppercase">
        Bills
      </Header>

      <div className="w-full h-full p-6 pt-0 flex flex-col divide-y-2 divide-gray-300 overflow-auto">
        {bills.length === 0 ? (
          <p className="text-lg mt-[20px]">No Bills Added.</p>
        ) : (
          bills.map((bill, index) => {
            const ret = [...bill.shares.map((share) => ({ ...share }))];
            console.log(bill, ret);
            return (
              <BillComponent
                key={bill.id}
                payer={bill.payer}
                total={bill.total}
                shares={ret}
                id={bill.id}
                ind={index}
              />
            );
          })
        )}
      </div>

      <div className="flex w-full mx-auto max-w-[800px] h-[70px] p-2 mb-2">
        <Button
          onClick={addBillClick}
          className={
            "text-white w-full rounded-md ml-auto " +
            (friends.length === 0 ? "disabled" : "")
          }
        >
          Add a Bill
        </Button>
      </div>
    </Main>
  );
}
