import { useSelector } from "react-redux";
import CreateSplitStage from "../components/CreateSplitStage";
import { createSplitHeirachy } from "../util/componentNavigation";
import AddBillStage from "../components/AddBillStage";
import SplitResultStage from "../components/SplitResultStage";

export default function SplitCreate() {
  const topNavStatus = useSelector(
    (state) => state.splitCreate.topNavSplitStatus
  );

  return (
    <>
      <span id="Top"></span>
      {topNavStatus === createSplitHeirachy[0] ? <CreateSplitStage /> : null}
      {topNavStatus === createSplitHeirachy[1] ? <AddBillStage /> : null}
      {topNavStatus === createSplitHeirachy[2] ? <SplitResultStage /> : null}
    </>
  );
}
