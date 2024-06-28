import SplitHeader from "../components/SplitHeader";
import { Outlet } from "react-router-dom";

export default function SplitPage() {
  return (
    <>
      <Outlet />
    </>
  );
}
