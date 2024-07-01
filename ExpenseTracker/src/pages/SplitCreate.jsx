import { useSelector } from "react-redux";
import CreateSplitStage from "../components/splitCreateComponents/CreateSplitStage";
import { createSplitHeirachy } from "../util/componentNavigation";
import AddBillStage from "../components/splitCreateComponents/AddBillStage";
import SplitResultStage from "../components/splitCreateComponents/SplitResultStage";

export default function SplitCreate() {
  const topNavStatus = useSelector(
    (state) => state.splitCreate.topNavSplitStatus
  );

  return (
    <>
      <span id="Top"></span>
      <div className="pt-12">
        {topNavStatus === createSplitHeirachy[0] ? <CreateSplitStage /> : null}
        {topNavStatus === createSplitHeirachy[1] ? <AddBillStage /> : null}
        {topNavStatus === createSplitHeirachy[2] ? <SplitResultStage /> : null}
      </div>
    </>
  );
}
