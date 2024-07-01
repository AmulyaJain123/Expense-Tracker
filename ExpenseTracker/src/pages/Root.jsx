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
          className="flex h-screen overflow-auto"
        >
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
