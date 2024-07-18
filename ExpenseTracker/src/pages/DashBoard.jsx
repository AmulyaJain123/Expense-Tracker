import { Link } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
      <Link to={"/track/create"}>Add New Transaction</Link>
    </div>
  );
}
