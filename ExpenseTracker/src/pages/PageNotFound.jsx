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
          className="flex w-full flex-col"
        >
          <TopNav />
          <div className="w-full rounded-l-xl h-screen my-2 overflow-auto">
            <div className="h-full w-full errorBg overflow-auto border-2 border-stone-800 text-stone-700 rounded-l-xl">
              <div className="mx-auto w-fit px-[70px] py-[50px] border-4 border-stone-500 rounded-xl mt-[100px] bg-stone-200 flex flex-col justify-center items-center">
                <img className="h-[200px] w-[200px]" src={errorImg} alt="" />
                <p className="text-[20px] text-center p-4 mt-[50px] font-semibold">
                  {msg}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
