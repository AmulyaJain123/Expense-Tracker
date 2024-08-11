import { styling } from "../util/styling";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import TopNavThumbs from "../UIComponents/TopNavThumbs";
import { createSplitHeirachy } from "../util/componentNavigation";
import logIn from "../assets/logIn.png";
import logOut from "../assets/logOut.png";
import userIcon from "../assets/user.png";
import { getCurrentUser } from "../store/firebase-context";
import { useEffect, useState } from "react";
import { useFirebase } from "../store/firebase-context";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useNavigate } from "react-router-dom";
import TopNavButton from "../UIComponents/TopNavButton";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";

export default function TopNav() {
  const location = useLocation();
  const isOnCreateSplit = location.pathname === "/split/create";
  const isOnCreateBill = location.pathname === "/vault/create";
  const isOnCreateTransaction = location.pathname === "/track/create";
  const isOnHome = location.pathname === "/";
  const isOnSplitHome = location.pathname === "/split";
  const isOnBillVaultHome = location.pathname === "/vault";
  const isOnVault = location.pathname === "/vault/view";
  const isOnBillView = location.pathname === "/vault/view/bill";
  const isOnBillTrackHome = location.pathname === "/track";
  const isOnDashboard = location.pathname === "/track/dashboard";
  const isOnDistributions = location.pathname === "/track/distributions";
  const isOnTransactions = location.pathname === "/track/transactions";

  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuStatus = useSelector((state) => state.universal.hamMenu);

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

  function menuClick() {
    dispatch(universalActions.openMenu());
  }

  return (
    <div
      style={{
        marginTop: `${styling.spacing}px`,
        backgroundColor: styling.navColor,
      }}
      className="flex rounded-r-xl lg:rounded-r-none items-center p-2 h-11 sm:h-14 rounded-l-xl"
    >
      {menuStatus ? (
        <>
          <HamburgerMenu />
        </>
      ) : null}

      <button
        onClick={menuClick}
        className="flex p-2 mr-4 ml-2 rounded-lg lg:hidden hover:bg-slate-200"
      >
        <div>
          <i className="fi fi-rs-burger-menu flex justify-center items-center text-xl sm:text-2xl"></i>
        </div>
      </button>
      {isOnHome ? <TopNavButton>Home</TopNavButton> : null}
      {isOnSplitHome ? <TopNavButton>BillSplit Home</TopNavButton> : null}
      {isOnBillVaultHome ? <TopNavButton>BillVault Home</TopNavButton> : null}

      {isOnBillTrackHome ? <TopNavButton>BillTrack Home</TopNavButton> : null}

      {fetchingUser === false ? (
        <>
          {user != null ? (
            <>
              {isOnCreateSplit
                ? createSplitHeirachy.map((status) => (
                    <TopNavThumbs key={status} bool={location.search}>
                      {status}
                    </TopNavThumbs>
                  ))
                : ""}
              {isOnCreateBill ? <TopNavButton>Bill Upload</TopNavButton> : null}
              {isOnCreateTransaction ? (
                <TopNavButton>Transaction Creation</TopNavButton>
              ) : null}

              {isOnVault ? <TopNavButton>Vault</TopNavButton> : null}
              {isOnBillView ? <TopNavButton>Bill View</TopNavButton> : null}

              {isOnDashboard ? <TopNavButton>Dashboard</TopNavButton> : null}
              {isOnDistributions ? (
                <TopNavButton>Distributions</TopNavButton>
              ) : null}
              {isOnTransactions ? (
                <TopNavButton>Transactions</TopNavButton>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}

      {fetchingUser === false ? (
        <>
          {user != null ? (
            <div className="flex space-x-4 mr-[6px] sm:mr-[20px] ml-auto">
              <div className="flex rounded-full p-2 space-x-2 sm:space-x-6 bg-slate-200 pr-4 sm:pr-6">
                <img
                  src={userIcon}
                  className="rounded-full w-[17px] h-[17px] sm:h-[25px] sm:w-[25px] bg-white"
                  alt=""
                />
                <span className=" text-xs sm:text-base font-medium">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={logOutClick}
                className="rounded-xl hover:bg-slate-200 p-2 duration-500"
              >
                <img
                  src={logOut}
                  className="w-[17px] h-[17px] sm:h-[25px] sm:w-[25px]"
                  alt=""
                />
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 mr-[6px] sm:mr-[20px] ml-auto">
              <Link
                to={"/auth"}
                className="rounded-xl hover:bg-slate-200 p-2 duration-500"
              >
                <img
                  src={logIn}
                  className=" w-[17px] h-[17px] sm:h-[25px] sm:w-[25px]"
                  alt=""
                />
              </Link>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
