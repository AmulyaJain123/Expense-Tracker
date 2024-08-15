import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import styled from "styled-components";
import { styling } from "../util/styling";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTile from "./PageTile";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../store/firebase-context";
import { useFirebase } from "../store/firebase-context";
import { useNavigate } from "react-router-dom";
import logIn from "../../public/logIn.png";
import logOut from "../../public/logOut.png";

const Logo = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  color: black;
  text-align: left;
  text-align: center;
`;

const Tiles = styled.div`
  margin-top: 30px;
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

export default function HamburgerMenu() {
  const dispatch = useDispatch();
  const location = useLocation();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  function backClick() {
    dispatch(universalActions.closeMenu());
  }

  async function getUser() {
    const us = await getCurrentUser();
    // console.log(us);
    setFetchingUser(false);
    setUser(us);
  }
  useEffect(() => {
    getUser();
  }, []);

  async function logOutClick() {
    const res = await firebase.logOutCurrUser();
    if (res.ok) {
      navigate("/auth");
    } else {
      dispatch(
        universalActions.setToastMsg({
          msg: "Logged Out Unsuccessful :(",
          mood: "error",
        })
      );
    }
  }

  return (
    <>
      <div
        onClick={backClick}
        className="absolute w-[100vw] z-[100] h-[100vh] top-0 bg-black/30 left-0 "
      ></div>
      <div className="absolute z-[110] flex flex-col top-0 left-0 bg-white w-[250px] h-screen">
        <div className="">
          <Logo>BILLBUD</Logo>
        </div>
        <Tiles>
          {pages.map((page) => {
            return <PageTile key={page.name} details={{ ...page }} />;
          })}
        </Tiles>
        <div className="flex flex-grow items-end">
          {fetchingUser === false ? (
            <div className="flex flex-grow justify-end flex-col">
              {user != null ? (
                <div className="flex flex-col space-y-4 mb-[20px]  ">
                  <button
                    onClick={logOutClick}
                    className="rounded-lg hover:bg-slate-200 flex space-x-6 mx-4  p-2 duration-500"
                  >
                    <img src={logOut} className=" w-[20px]" alt="" />
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4  mb-[20px] mt-auto">
                  <Link
                    to={"/auth"}
                    className="rounded-lg space-x-6 flex mx-4 hover:bg-slate-200 p-2 duration-500"
                  >
                    <img src={logIn} className=" w-[20px]" alt="" />
                    <span className="font-medium text-sm">Login</span>
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}