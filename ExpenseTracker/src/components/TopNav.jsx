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

export default function TopNav() {
  const location = useLocation();
  const isOnCreateSplit = location.pathname === "/split/create";
  const isOnCreateBill = location.pathname === "/vault/create";
  const isOnCreateTransaction = location.pathname === "/track/create";
  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getUser() {
    const us = await getCurrentUser();
    console.log(us);
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
    <div
      style={{
        marginTop: `${styling.spacing}px`,
        backgroundColor: styling.navColor,
      }}
      className="flex  items-center p-2 h-14 rounded-l-xl"
    >
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
              {isOnCreateBill ? (
                <div className="p-1">
                  <div
                    style={{
                      backgroundColor: styling.topNavThumbsBgCol,
                      border: `2px solid ${styling.topNavThumbsBgCol}`,
                    }}
                    className="p-1 rounded-lg px-2 flex items-center"
                  >
                    Bill Upload
                  </div>
                </div>
              ) : null}
              {isOnCreateTransaction ? (
                <div className="p-1">
                  <div
                    style={{
                      backgroundColor: styling.topNavThumbsBgCol,
                      border: `2px solid ${styling.topNavThumbsBgCol}`,
                    }}
                    className="p-1 rounded-lg px-2 flex items-center"
                  >
                    Transaction Creation
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}

      {fetchingUser === false ? (
        <>
          {user != null ? (
            <div className="flex space-x-4 mr-[20px] ml-auto">
              <div className="flex rounded-full p-2 space-x-6 bg-slate-200 pr-6">
                <img
                  src={userIcon}
                  className="rounded-full w-[25px] bg-white"
                  alt=""
                />
                <span className=" font-medium">{user.displayName}</span>
              </div>
              <button
                onClick={logOutClick}
                className="rounded-xl hover:bg-slate-200 p-2 duration-500"
              >
                <img src={logOut} className=" w-[25px]" alt="" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 mr-[20px] ml-auto">
              <Link
                to={"/auth"}
                className="rounded-xl hover:bg-slate-200 p-2 duration-500"
              >
                <img src={logIn} className=" w-[25px]" alt="" />
              </Link>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
