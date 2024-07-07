import vault from "../assets/vault.png";
import { Link } from "react-router-dom";

export default function VaultHome() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
      <h2 className="flex justify-center text-[50px] mt-12 p-4 font-bold capitalize ">
        BillVault
      </h2>
      <div className=" mt-8 flex mx-[100px] space-x-[20px]">
        <div className="flex flex-col space-y-6 my-auto">
          <p className="text-lg font-medium flex justify-center items-center text-center ">
            BillVault is your personal digital archive for all your important
            bills and receipts. With BillVault, you can effortlessly save photos
            of your bills and add essential details such as the name, date, and
            description.
          </p>
          <p className="text-lg font-medium flex justify-center items-center text-center ">
            Whether it's for tracking expenses, managing warranties, or keeping
            records for future reference, BillVault ensures that all your
            critical documents are securely stored and easily accessible.
          </p>
        </div>
        <img className="w-[450px]" src={vault} alt="" />
      </div>
      <Link to={"create"}>Add A Bill</Link>
    </div>
  );
}
