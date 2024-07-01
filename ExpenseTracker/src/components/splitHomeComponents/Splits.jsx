import styled from "styled-components";
import NewSplitBox from "./NewSplitBox";
import SplitBox from "./SplitBox";
import { useFirebase } from "../../store/firebase-context";

export default function Splits() {
  const firebase = useFirebase();

  async function getAllDocs() {
    const res = await firebase.getAllSplits();
    console.log(res.docs);
  }
  getAllDocs();

  return (
    <div className="mt-16">
      <div className="text-3xl uppercase underline underline-offset-8 font-semibold flex justify-center">
        Splits
      </div>

      <div className="mt-[50px] mx-[150px]">
        <div className="mt-12 mb-8 text-2xl p-2 rounded-l-xl border-l-2 border-t-2 border-b-2 border-stone-400 bg-stone-200 font-medium">
          Create New Split
        </div>
        <div className="ml-[20px]">
          <NewSplitBox />
        </div>
      </div>
      <div className="mt-[50px] mx-[150px]">
        <div className="mt-12 mb-8 text-2xl p-2 rounded-l-xl border-l-2 border-t-2 border-b-2 border-stone-400 bg-stone-200 font-medium">
          Saved Splits
        </div>
        <div className="ml-[20px]">
          <SplitBox />
        </div>
      </div>
    </div>
  );
}
