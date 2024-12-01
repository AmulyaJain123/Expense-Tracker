import { useSelector } from "react-redux";
import CreateSplitStage from "../components/splitCreateComponents/CreateSplitStage";
import { createSplitHeirachy } from "../util/componentNavigation";
import AddBillStage from "../components/splitCreateComponents/AddBillStage";
import SplitResultStage from "../components/splitCreateComponents/SplitResultStage";
import logInIcon from "../assets/logIn.png";
import { Link } from "react-router-dom";

export default function SplitCreate() {
  const topNavStatus = useSelector(
    (state) => state.splitCreate.topNavSplitStatus
  );
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-l-xl">
        {userDetails ? (
          <>
            <span id="Top"></span>
            <div className="pt-12">
              {topNavStatus === createSplitHeirachy[0] ? (
                <CreateSplitStage />
              ) : null}
              {topNavStatus === createSplitHeirachy[1] ? (
                <AddBillStage />
              ) : null}
              {topNavStatus === createSplitHeirachy[2] ? (
                <SplitResultStage />
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex flex-col mt-24 items-center space-y-6">
            <Link to={"/auth"}>
              <img
                src={logInIcon}
                className="w-[100px] p-3 rounded-xl hover:bg-white duration-500 "
                alt=""
              />
            </Link>
            <p className="flex justify-center text-xl text-stone-500 font-semibold">
              Login Required
            </p>
          </div>
        )}
      </div>
    </>
  );
}
