import NewSplitBox from "./NewSplitBox";
import SavedSplits from "./SavedSplits";

export default function Splits() {
  return (
    <div className="mt-16">
      <div className="text-[35px] sm:text-[40px] uppercase font-bold flex justify-center">
        Splits
      </div>

      <div className="mt-[50px] mx-6 sm:mx-[50px] lg:mx-[150px]">
        <div className="mt-12 mb-8 text-xl sm:text-2xl p-1 sm:p-2 rounded-l-xl border-l-2 border-t-2 border-b-2 border-stone-400 bg-stone-200 font-medium">
          Create New Split
        </div>
        <NewSplitBox />
      </div>
      <div className="mt-[50px] mx-6 sm:mx-[50px] lg:mx-[150px]">
        <div className="mt-12 mb-8 text-xl sm:text-2xl p-1 sm:p-2 rounded-l-xl border-l-2 border-t-2 border-b-2 border-stone-400 bg-stone-200 font-medium">
          Saved Splits
        </div>
        <SavedSplits />
      </div>
    </div>
  );
}
