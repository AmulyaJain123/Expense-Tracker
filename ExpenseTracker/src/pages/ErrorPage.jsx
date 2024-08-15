import { useRouteError } from "react-router-dom";
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
              <div className="flex flex-col items-center space-y-6">
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
            <div className="flex flex-col scale-[80%] items-center">
              <div className="font-bold text-center mb-6 text-[40px]">
                OOPS &#160; : ( &#160; ERROR Occured
              </div>

              {error === "401" ? (
                <>
                  <i className="fi fi-rs-wifi-slash flex items-center justify-center text-[70px] mb-6"></i>
                  <p className="font-semibold text-2xl">
                    Could Not Reach Server
                  </p>
                </>
              ) : null}

              {error === "403" ? (
                <>
                  <i className="fi fi-rs-sad flex items-center justify-center text-[70px] mb-6"></i>
                  <p className="font-semibold text-2xl">Bad Request</p>
                </>
              ) : null}

              {error != "401" && error != "402" && error != "403" ? (
                <>
                  <i className="fi fi-rs-document-circle-wrong flex items-center justify-center text-[70px] mb-6"></i>
                  <p className="font-semibold text-2xl">Something Went Wrong</p>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
