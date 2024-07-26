import { styling } from "../util/styling";
import styled from "styled-components";
import PageTile from "./PageTile";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = styled.div`
  height: calc(100vh - ${styling.spacing * 2}px);
  margin-top: ${styling.spacing}px;
  background-color: ${styling.navColor};
`;
const Logo = styled.div`
  padding: 10px;
  font-size: 40px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  text-align: center;
`;
const Tiles = styled.div`
  margin-top: 50px;
`;

const pages = [
  {
    name: "Home",
    path: "",
    iconClass: "fi fi-rr-home",
    iconClassBold: "fi fi-ss-home",
    children: [],
  },
  {
    name: "BillVault",
    path: "vault",
    iconClass: "fi fi-rs-vault",
    iconClassBold: "fi fi-ss-vault",
    children: [
      {
        name: "Bill Upload",
        path: "vault/create",
      },
      {
        name: "Vault",
        path: "vault/view",
      },
    ],
  },
  {
    name: "BillTrack",
    path: "track",
    iconClass: "fi fi-rr-calculator-bill",
    iconClassBold: "fi fi-ss-calculator-bill",
    children: [
      {
        name: "Dashboard",
        path: "track/dashboard",
      },
      {
        name: "Transaction Create",
        path: "track/create",
      },
      {
        name: "Transactions",
        path: "track/transactions",
      },
      {
        name: "Distributions",
        path: "track/distributions",
      },
    ],
  },
  {
    name: "BillSplit",
    path: "split",
    iconClass: "fi fi-rs-hexagon-divide",
    iconClassBold: "fi fi-ss-hexagon-divide",
    children: [
      {
        name: "Split Create",
        path: "split/create",
      },
    ],
  },
];

export default function SideNav() {
  const location = useLocation();
  const [jump, setJump] = useState([]);
  console.log(location);

  useEffect(() => {
    if (location.pathname === "/") {
      const arr = pages.find((i) => {
        return i.name === "Home";
      }).children;
      setJump([...arr]);
    } else if (location.pathname.includes("/split")) {
      const arr = pages.find((i) => {
        return i.name === "BillSplit";
      }).children;
      setJump([...arr]);
    } else if (location.pathname.includes("/vault")) {
      const arr = pages.find((i) => {
        return i.name === "BillVault";
      }).children;
      setJump([...arr]);
    } else if (location.pathname.includes("/track")) {
      const arr = pages.find((i) => {
        return i.name === "BillTrack";
      }).children;
      setJump([...arr]);
    }
  }, [location]);

  console.log(jump);

  return (
    <Main className="w-72 rounded-r-xl">
      <Logo>
        <Link to={""}>BILLBUD</Link>
      </Logo>
      <Tiles>
        {pages.map((page) => {
          return <PageTile key={page.name} details={{ ...page }} />;
        })}
      </Tiles>
      <div
        style={{
          right: jump.length != 0 ? "0px" : "250px",
          transition: "right ease-in-out 1000ms",
          opacity: jump.length != 0 ? "1" : "0",
        }}
        className="flex flex-col relative mt-[50px] mb-[20px] px-6 text-black bg-slate-200 mr-6 py-3 rounded-r-lg"
      >
        <div className="text-xl font-semibold mb-3">Jump to</div>
        <div className="flex flex-col pl-2 space-y-2">
          {jump.map((link) => {
            return <Link to={link.path}>{link.name}</Link>;
          })}
        </div>
      </div>
    </Main>
  );
}
