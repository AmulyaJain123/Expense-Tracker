import { useRouteError } from "react-router-dom";
import user from "../assets/loginError.png";
import wifi from "../assets/wifi.png";
import sad from "../assets/sad.png";
import warning from "../assets/warning.png";
import { Link } from "react-router-dom";
import logInIcon from "../assets/logIn.png";

export default function ErrorPage() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div className="h-full w-full bg-stone-100 overflow-auto text-stone-400 rounded-l-xl">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col  pb-[200px] justify-center items-center">
          {error === "402" ? (
            <>
              <div className="flex flex-col items-center space-y-6 mt-[150px]">
                <Link to={"/auth"}>
                  <img
                    src={logInIcon}
                    className="w-[100px] p-3 rounded-xl hover:bg-slate-200 duration-500 "
                    alt=""
                  />
                </Link>
                <p className="flex justify-center text-xl text-stone-500 font-semibold">
                  Login Required
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="font-bold  mb-6 text-[40px]">
                OOPS &#160; : ( &#160; ERROR Occured
              </div>

              {error === "401" ? (
                <>
                  <img src={wifi} className="w-[80px]  mb-6" alt="" />
                  <p className="font-semibold text-2xl">
                    Could Not Reach Server
                  </p>
                </>
              ) : null}

              {error === "403" ? (
                <>
                  <img src={sad} className="w-[80px]  mb-6" alt="" />
                  <p className="font-semibold text-2xl">Bad Request</p>
                </>
              ) : null}

              {error === "404" ? (
                <>
                  <img src={warning} className="w-[80px]  mb-6" alt="" />
                  <p className="font-semibold text-2xl">Something Went Wrong</p>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
