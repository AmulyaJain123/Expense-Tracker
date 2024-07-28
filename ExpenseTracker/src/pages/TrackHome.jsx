import styled from "styled-components";
import billTrackIcon from "../assets/billTrack-Icon.png";
import { Link } from "react-router-dom";
import TrackHomeMenu from "../components/trackHomeComponents/TrackHomeMenu";

const Span = styled.span`
  font-size: large;
  font-weight: 600;
  border-bottom: solid black 4px;
  transition: all 200ms;
  padding: 0 1px;
`;

export default function TrackHome() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl">
      <h2 className="flex justify-center text-[50px] mt-12 p-4 font-bold capitalize ">
        BillTrack
      </h2>
      <div className=" mt-8 flex mx-[100px] space-x-[20px]">
        <div className="flex flex-col space-y-6 my-auto">
          <p className="text-lg font-medium flex justify-center items-center text-center ">
            With BillTrack, you can seamlessly monitor and manage your expenses
            in one convenient place. Whether it's daily spending, monthly bills,
            or unexpected costs, BillTrack helps you stay on top of your
            finances with ease. Track your expenses, analyze spending patterns,
            and gain insights into your financial habits to make informed
            decisions.
          </p>
          <p className="text-lg font-medium flex justify-center items-center text-center ">
            Join BillBud today and take control of your financial journey with
            BillTrack!
          </p>
        </div>
        <img className="w-[450px]" src={billTrackIcon} alt="" />
      </div>
      <TrackHomeMenu />

      <div className="text-3xl font-bold text-stone-500  p-2 mt-[50px] pl-6 py-2 bg-stone-200 border-2 border-stone-400 rounded-l-xl border-r-[0px] mb-12 mx-[200px]">
        Links
      </div>

      <div className="flex mb-4 justify-start space-x-6 mx-[220px] flex-wrap">
        <Link
          className="py-2 px-4 w-[200px] h-[200px] group rounded-2xl  text-2xl  text-[#fff] hover:text-[#9d4edd] hover:scale-110 hover:bg-[#fff] border-2 border-[#9d4edd] duration-500 font-semibold bg-[#9d4edd]"
          to={"dashboard"}
        >
          <p className="pb-2 border-b-2 border-white group-hover:border-[#9d4edd] ">
            Go To Dashboard
          </p>
        </Link>
        <Link
          className="py-2 px-4 w-[200px] h-[200px] group justify-center items-center rounded-2xl  text-2xl  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
          to={"create"}
        >
          <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
            <span className="flex items-center mr-3">
              <i className="fi fi-br-plus flex justify-center mr-3 text-xl items-center"></i>
              <span>Create</span>
            </span>
            <span className="flex items-center">Transaction</span>
          </p>
        </Link>
        <Link
          className="py-2 px-4 w-[200px] h-[200px] group justify-center items-center rounded-2xl  text-2xl  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
          to={"transactions"}
        >
          <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
            Go To Transactions
          </p>
        </Link>
        <Link
          className="py-2 px-4 w-[200px] h-[200px] group justify-center items-center rounded-2xl  text-2xl  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-2 border-[#000] duration-500 font-semibold bg-[#000]"
          to={"distributions"}
        >
          <p className="pb-2 border-b-2 border-white group-hover:border-[#000] ">
            Go To Distributions
          </p>
        </Link>
      </div>
    </div>
  );
}
