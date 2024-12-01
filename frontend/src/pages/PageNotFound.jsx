import errorImg from "../assets/error-icon.png";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { styling } from "../util/styling";

export default function PageNotFound() {
  const msg = "Page Not Found";

  return (
    <>
      <div
        style={{ backgroundColor: styling.backColor }}
        className="flex h-screen relative overflow-auto"
      >
        <SideNav />
        <div
          style={{ marginLeft: `${styling.spacing}px` }}
          className="flex w-full mr-2 lg:mr-0 flex-col"
        >
          <TopNav />
          <div className="w-full rounded-l-xl rounded-r-xl mr-2 lg:mr-0 lg:rounded-r-none h-screen my-2 overflow-auto">
            <div className="h-full w-full bg-stone-100 overflow-auto text-stone-400 rounded-l-xl">
              <div className="flex flex-col mt-32 scale-[80%] items-center">
                <div className="font-bold text-center  mb-6 text-[40px]">
                  OOPS &#160; : ( &#160; ERROR Occured
                </div>
                <i className="fi fi-rr-not-found flex items-center justify-center text-[80px] mb-6"></i>
                <p className="font-semibold text-2xl">Page Not Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
