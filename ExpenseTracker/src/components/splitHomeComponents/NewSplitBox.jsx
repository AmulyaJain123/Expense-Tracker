import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";

const options = [
  { name: "striped" },
  { name: "lemon" },
  { name: "akatsuki" },
  { name: "autumn" },
  { name: "skulls" },
  { name: "liquid" },
  { name: "waves" },
];

export default function NewSplitBox() {
  const dispatch = useDispatch();

  function setBack(name) {
    dispatch(splitCreateActions.setBgPattern(name));
  }

  return (
    <div className="mx-[20px] flex flex-wrap gap-x-5  gap-y-5">
      {options.map((option) => {
        const str =
          "rounded-3xl border-2 group border-[white] hover:border-stone-600 w-[200px] h-[200px] hover:shadow-xl duration-500  hover:scale-105  flex justify-center text-center items-center p-4 " +
          option.name;
        return (
          <Link
            to={"create"}
            onClick={() => setBack(option.name)}
            className={str}
          >
            <div className="w-[40] rounded-full h-[40px] bg-black group-hover:bg-white flex items-center justify-center">
              <i className="fi fi-ss-add text-[50px] text-[#fff] group-hover:text-[black] duration-500 flex justify-center items-center"></i>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
