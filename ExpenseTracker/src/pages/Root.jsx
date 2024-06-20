import { Outlet } from "react-router-dom";
import { styling } from "../util/styling";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default function Root() {
  return (
    <>
      <>
        <div
          style={{ backgroundColor: styling.backColor }}
          className="flex h-screen"
        >
          <SideNav />
          <div
            style={{ marginLeft: `${styling.spacing}px` }}
            className="flex w-full flex-col"
          >
            <TopNav />
            <div className="w-full px-12 py-12 h-screen overflow-auto ">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    </>
  );
}
