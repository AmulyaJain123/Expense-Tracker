import { Outlet } from "react-router-dom";
import { styling } from "../util/styling";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useNavigation } from "react-router-dom";

export default function Root() {
  const navigate = useNavigation();
  return (
    <>
      <>
        <div
          style={{ backgroundColor: styling.backColor }}
          className="flex h-screen relative overflow-auto"
        >
          {navigate.state === "loading" ? (
            <div className="w-[100vw] h-[40px] absolute flex top-0 left-0 justify-center text-lg font-semibold items-center bg-[#dc93f6]">
              Loading......
            </div>
          ) : null}
          <SideNav />
          <div
            style={{ marginLeft: `${styling.spacing}px` }}
            className="flex w-full flex-col"
          >
            <TopNav />
            <div className="w-full rounded-l-xl h-screen my-2 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    </>
  );
}
