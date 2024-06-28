import { splitAlgo } from "../util/algo";
import { useSelector } from "react-redux";
export default function SplitResultStage() {
  const bills = useSelector((state) => state.splitCreate.bills);
  splitAlgo(bills);
  return <> </>;
}
