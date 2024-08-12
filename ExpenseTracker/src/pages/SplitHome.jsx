import { useFirebase } from "../store/firebase-context";
import split from "../assets/split.png";
import SplitHomeMenu from "../components/splitHomeComponents/SplitHomeMenu";
import Splits from "../components/splitHomeComponents/Splits";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../store/firebase-context";
import { Link } from "react-router-dom";
import logInIcon from "../assets/logIn.png";

export default function SplitHome() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  async function getUser() {
    const res = await getCurrentUser();
    setUser(res);
    setFetching(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
        <h2 className="flex justify-center text-[35px] sm:text-[40px] xl:text-[50px] mt-12 p-4 font-bold capitalize ">
          BillSplit
        </h2>
        <div className=" mt-8 flex flex-col sm:flex-row space-y-8 sm:space-y-0 mx-[50px] md:mx-[100px] sm:space-x-[20px]">
          <img
            className="w-[350px] sm:w-[300px] h-fit self-center xl:w-[450px]"
            src={split}
            alt=""
          />
          <div className="flex text-sm self-center md:text-base xl:text-lg flex-col space-y-6 my-auto">
            <p className=" font-medium flex justify-center items-center text-center ">
              Welcome to BillSplit, the ultimate solution for managing and
              dividing expenses among friends, family, or colleagues. Whether
              you're sharing the cost of a meal, a group outing, or any other
              expense, BillSplit simplifies the process and helps everyone
              settle up quickly.
            </p>
            <p className=" font-medium flex justify-center items-center text-center ">
              Get started today and experience hassle-free bill splitting with
              BillSplit!
            </p>
          </div>
        </div>
        <SplitHomeMenu />

        {fetching ? (
          <p className="flex justify-center text-base sm:text-lg mt-[50px] font-medium">
            Loading User Info...
          </p>
        ) : (
          <>
            {user === null ? (
              <div className="flex flex-col scale-90 sm:scale-100 items-center space-y-6 mt-[150px]">
                <Link to={"/auth"}>
                  <img
                    src={logInIcon}
                    className="w-[100px] p-3 rounded-xl hover:bg-slate-200 duration-500 "
                    alt=""
                  />
                </Link>
                <p className="flex justify-center text-xl text-stone-500 font-semibold">
                  Login to Create and Save Splits
                </p>
              </div>
            ) : (
              <Splits />
            )}
          </>
        )}
      </div>
    </>
  );
}
