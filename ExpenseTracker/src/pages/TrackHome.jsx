import styled from "styled-components";
import billTrackIcon from "../assets/billTrack-Icon.png";
import { Link } from "react-router-dom";

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
      <div id="menu">
        <div className="flex justify-center space-x-10 mt-[175px]">
          <Span className="">How to Use BillVault</Span>
        </div>
        <div id="menuContent" className="mt-8 mx-[100px]">
          <div className="mt-16 flex flex-col space-y-2">
            <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
              <div className="font-medium text-lg pl-2 w-1/3">
                Create a New Bill{" "}
              </div>
              <div className="w-2/3 flex flex-col space-y-2">
                <p>
                  Navigate to the BillVault section and click on "Add Bill".
                </p>
                <p>
                  Fill in the required details like Bill Date, Bill Name, Bill
                  Amount, Etc.
                </p>
              </div>
            </div>
            <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
              <div className="font-medium text-lg pl-2 w-1/3">
                {"Add Warranty Information (Optional)"}{" "}
              </div>
              <div className="w-2/3 flex flex-col space-y-2">
                <p>
                  If your Bill includes a warranty, you can provide additional
                  details by specifying either the warranty duration or the
                  warranty expiration date.
                </p>
                <p>
                  This information will be used to display the warranty status
                  when you view your saved Bills.
                </p>
              </div>
            </div>
            <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
              <div className="font-medium text-lg pl-2 w-1/3">
                Upload Bill Images
              </div>
              <div className="w-2/3 flex flex-col space-y-2">
                <p>
                  You can upload up to four images of your Bill to keep a visual
                  record of your documents.
                </p>
              </div>
            </div>
            <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
              <div className="font-medium text-lg pl-2 w-1/3">
                Save Your Bill
              </div>
              <div className="w-2/3 flex flex-col space-y-2">
                <p>
                  After entering all the necessary details and uploading images,
                  click "Save" to store your Bill in BillVault.
                </p>
              </div>
            </div>
            <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
              <div className="font-medium text-lg pl-2 w-1/3">
                View and Manage Saved Bills
              </div>
              <div className="w-2/3 flex flex-col space-y-2">
                <p>
                  Access your saved Bills anytime from the BillVault section.
                </p>
                <p>
                  Each Bill entry will display its warranty status if warranty
                  information was provided.
                </p>
                <p>
                  You can also download the images attached to each BIll for
                  your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="py-2 px-4 rounded-xl text-2xl mx-auto my-[80px] text-[#e7e5e4] font-semibold bg-[#9d4edd]"
          to={"dashboard"}
        >
          Go to DashBoard
        </Link>
      </div>
    </div>
  );
}
