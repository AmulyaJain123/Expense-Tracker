import { Link } from "react-router-dom";
import Transactions from "../components/dashBoardComponents/Transactions";

export default function DashBoard() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] flex flex-col space-y-4 text-stone-700 rounded-l-xl">
      <Link to={"/track/create"}>Add New Transaction</Link>
      <Transactions />
    </div>
  );
}
