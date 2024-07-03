import { useFirebase } from "../store/firebase-context";
import split from "../assets/split.png";
import SplitHomeMenu from "../components/splitHomeComponents/SplitHomeMenu";
import Splits from "../components/splitHomeComponents/Splits";

export default function SplitHome() {
  const firebase = useFirebase();

  return (
    <>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <h2 className="flex justify-center text-[50px] mt-12 p-4 font-bold capitalize ">
          BillSplit
        </h2>
        <div className=" mt-8 flex mx-[100px] space-x-[20px]">
          <img className="w-[450px]" src={split} alt="" />
          <div className="flex flex-col space-y-6 my-auto">
            <p className="text-lg font-medium flex justify-center items-center text-center ">
              Welcome to BillSplit, the ultimate solution for managing and
              dividing expenses among friends, family, or colleagues. Whether
              you're sharing the cost of a meal, a group outing, or any other
              expense, BillSplit simplifies the process and helps everyone
              settle up quickly.
            </p>
            <p className="text-lg font-medium flex justify-center items-center text-center ">
              Get started today and experience hassle-free bill splitting with
              BillSplit!
            </p>
          </div>
        </div>
        <SplitHomeMenu />
        <Splits />
      </div>
    </>
  );
}
