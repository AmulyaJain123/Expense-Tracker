import { useState } from "react";
import styled from "styled-components";
import WhatIsMenu from "./WhatIsMenu";
import AddingTransactions from "./AddingTransactions";
import DashboardMenu from "./DashboardMenu";
import TransactionMenu from "./TransactionMenu";
import DistributionMenu from "./DistributionMenu";

const Button = styled.button`
  font-size: large;
  font-weight: 600;
  border-bottom: ${(props) => {
    return props.$status === true ? "solid black 4px" : "solid white 4px";
  }};
  transition: all 200ms;
  padding: 0 1px;
`;

const menu = [];

export default function TrackHomeMenu() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  function menuClick(event) {
    const num = parseInt(event.target.id);
    setSelectedMenu(num);
  }

  return (
    <div id="menu">
      <div className="flex justify-center space-x-10 mt-[175px]">
        <Button
          $status={selectedMenu === 0}
          onClick={(event) => menuClick(event)}
          id="0"
          className=""
        >
          What is BillTrack?
        </Button>
        <Button
          $status={selectedMenu === 1}
          onClick={(event) => menuClick(event)}
          id="1"
          className=""
        >
          Adding Transactions
        </Button>
        <Button
          $status={selectedMenu === 2}
          onClick={(event) => menuClick(event)}
          id="2"
          className=""
        >
          Dashboard
        </Button>
        <Button
          $status={selectedMenu === 3}
          onClick={(event) => menuClick(event)}
          id="3"
          className=""
        >
          Transaction Page
        </Button>
        <Button
          $status={selectedMenu === 4}
          onClick={(event) => menuClick(event)}
          id="4"
          className=""
        >
          Distribution Page
        </Button>
      </div>
      <div id="menuContent" className="mt-8 h-[500px] mx-[100px]">
        {selectedMenu === 0 ? <WhatIsMenu /> : null}
        {selectedMenu === 1 ? <AddingTransactions /> : null}
        {selectedMenu === 2 ? <DashboardMenu /> : null}
        {selectedMenu === 3 ? <TransactionMenu /> : null}
        {selectedMenu === 4 ? <DistributionMenu /> : null}
      </div>
    </div>
  );
}
