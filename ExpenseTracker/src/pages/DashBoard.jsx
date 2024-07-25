import { Link } from "react-router-dom";
import Transactions from "../components/dashBoardComponents/Transactions";
import WidgetSquare from "../components/dashBoardComponents/WidgetSquare";
import Distribution from "../components/dashBoardComponents/Distribution";

export default function DashBoard() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px]  text-stone-700 rounded-l-xl">
      <div className="flex flex-col space-y-4">
        <div className="flex mx-4 mt-4 p-2 px-6 justify-center items-center uppercase text-[35px] font-bold rounded-xl bg-[#9f21e3] text-white">
          Dashboard
        </div>
        <div className="flex space-x-4 mx-4 mt-4">
          <WidgetSquare />
          <Distribution />
        </div>

        <Transactions />
      </div>
    </div>
  );
}
