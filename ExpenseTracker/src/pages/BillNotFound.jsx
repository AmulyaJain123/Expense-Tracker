import errorImg from "../assets/error-icon.png";
import { useRouteError } from "react-router-dom";

export default function BillNotFound() {
  const error = useRouteError();
  const msg = JSON.parse(error.data).message;

  return (
    <div className="h-full w-full bg-stone-100 overflow-auto text-stone-700 rounded-l-xl">
      <div className="mx-auto w-fit px-[70px] py-[50px] border-4 border-stone-500 rounded-xl mt-[100px] bg-stone-200 flex flex-col justify-center items-center">
        <img className="h-[200px] w-[200px]" src={errorImg} alt="" />
        <p className="text-[20px] text-center p-4 mt-[50px] font-semibold">
          {msg}
        </p>
      </div>
    </div>
  );
}
