import { useRouteError } from "react-router-dom";
import user from "../assets/loginError.png";
import wifi from "../assets/wifi.png";
import sad from "../assets/sad.png";
import warning from "../assets/warning.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="h-full w-full bg-stone-100 overflow-auto text-stone-400 rounded-l-xl">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col  pb-[200px] justify-center items-center">
          <div className="font-bold  mb-6 text-[40px]">
            OOPS !! ERROR Occured &#160; : (
          </div>
          {error === "401" ? (
            <>
              <img src={wifi} className="w-[100px]  mb-6" alt="" />
              <p className="font-semibold text-2xl">Could Not Reach Server</p>
            </>
          ) : null}

          {error === "402" ? (
            <>
              <img src={user} className="w-[100px]  mb-6" alt="" />
              <p className="font-semibold text-2xl mb-1">
                Permission Not Granted
              </p>
              <p className="font-semibold text-2xl">Login To Continue</p>
            </>
          ) : null}

          {error === "403" ? (
            <>
              <img src={sad} className="w-[100px]  mb-6" alt="" />
              <p className="font-semibold text-2xl">Bad Request</p>
            </>
          ) : null}

          {error === "404" ? (
            <>
              <img src={warning} className="w-[100px]  mb-6" alt="" />
              <p className="font-semibold text-2xl">Something Went Wrong</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
