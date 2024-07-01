import { Link } from "react-router-dom";

export default function NewSplitBox() {
  return (
    <Link
      to={"create"}
      className="rounded-3xl border-4 group border-stone-300 hover:border-stone-600 w-[200px] h-[200px] hover:shadow-xl duration-500  hover:scale-105 hover:translate-y-[-5px] bg-stone-300 flex justify-center text-center items-center p-4"
    >
      <i className="fi fi-ss-add text-[50px] text-stone-500 group-hover:text-stone-600 duration-500 flex justify-center items-center"></i>
    </Link>
  );
}
