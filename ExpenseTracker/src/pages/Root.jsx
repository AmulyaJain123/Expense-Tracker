import { Outlet } from "react-router-dom";
import { styling } from "../util/styling";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useNavigation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Root.module.css";

export default function Root() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const toastMsg = useSelector((state) => state.universal.toastMsg);

  useEffect(() => {
    // console.log("toastMsg", toastMsg);
    if (toastMsg != null) {
      if (toastMsg.mood === "success") {
        toast.success(toastMsg.msg);
      } else if (toastMsg.mood === "error") {
        toast.error(toastMsg.msg);
      }
    }
  }, [toastMsg]);

  function close() {
    dispatch(universalActions.clearToastMsg());
  }

  return (
    <>
      <>
        <div
          style={{ backgroundColor: styling.backColor }}
          className="flex h-screen relative max-w-screen overflow-auto"
        >
          {navigate.state === "loading" ? (
            <div className="w-[100vw] h-[40px] z-[100] absolute flex top-0 left-0 justify-center text-lg font-semibold items-center bg-[#dc93f6]">
              Loading......
            </div>
          ) : null}
          <SideNav />
          <div
            style={{ marginLeft: `${styling.spacing}px` }}
            className="flex w-full flex-col mr-[8px] lg:mr-[0px]"
          >
            <TopNav />
            <div className={`${styles.main}`}>
              <Outlet />
            </div>
          </div>
        </div>
      </>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        onClose={close}
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}
