import { useRef, useState } from "react";
import styled from "styled-components";
import { styling } from "../util/styling";
import { useFirebase } from "../store/firebase-context";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Button = styled.button`
  background-color: ${(props) =>
    props.$status === "false" ? "white" : "#9f21e3"};
  color: ${(props) => (props.$status === "true" ? "white" : "#9f21e3")};
  flex-grow: ${(props) => (props.$status === "true" ? "1" : "0")};
  transition: all 500ms;

  &:hover {
    background-color: #9f21e3;
    color: white;
  }
`;

export default function AuthPage() {
  const [selected, setSelected] = useState(1);
  const firstNameRef = useRef();
  const LastNameRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPasswordRef = useRef();
  const logInEmailRef = useRef();
  const logInPasswordRef = useRef();
  const [logInError, setLogInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // console.log(email);
    const res = email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);
    // console.log(res);
    return res;
  };

  function validatePassword(pass) {
    return pass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
  }

  async function signUp() {
    if (firstNameRef.current.value.trim() === "") {
      setSignUpError("First Name cannot be empty");
    } else if (LastNameRef.current.value.trim() === "") {
      setSignUpError("Last Name cannot be empty");
    } else if (signUpEmailRef.current.value.trim() === "") {
      setSignUpError("Email cannot be empty");
    } else if (validateEmail(signUpEmailRef.current.value.trim()) === null) {
      setSignUpError("Email Invalid  ");
    } else if (validatePassword(signUpPasswordRef.current.value) === null) {
      setSignUpError(
        "Password must be of 6 to 16 alphanumeric characters and contain atleast 1 numeric and special character"
      );
    } else {
      setSignUpError(null);
      setSignUpLoading(true);
      const email = signUpEmailRef.current.value;
      const password = signUpPasswordRef.current.value;
      const res = await firebase.signUp(
        email,
        password,
        firstNameRef.current.value.trim(),
        LastNameRef.current.value.trim()
      );
      setSignUpLoading(false);
      if (res.ok === undefined) {
        toast.success("Signed Up Successfully");
      } else {
        toast.error("Sign Up Unsuccessful :(");
      }
    }
  }

  async function logIn() {
    if (logInEmailRef.current.value.trim() === "") {
      setLogInError("Email cannot be empty");
    } else if (validateEmail(logInEmailRef.current.value.trim()) === null) {
      setLogInError("Email Invalid  ");
    } else if (validatePassword(logInPasswordRef.current.value) === null) {
      setLogInError(
        "Password must be of 6 to 16 alphanumeric characters and contain atleast 1 numeric and special character"
      );
    } else {
      setLogInError(null);
      setLogInLoading(true);
      const email = logInEmailRef.current.value;
      const password = logInPasswordRef.current.value;
      const res = await firebase.signIn(email, password);
      setLogInLoading(false);
      // console.log(res);
      if (res.ok === undefined) {
        dispatch(
          universalActions.setToastMsg({
            msg: "Logged In Successfully",
            mood: "success",
          })
        );
        navigate("/");
      } else {
        toast.error("Log In Unsuccessful :(");
      }
    }
  }

  function cleanAll(num) {
    if (num === 2) {
      setLogInError(null);
      logInEmailRef.current.value = "";
      logInPasswordRef.current.value = "";
    } else {
      setSignUpError(null);
      LastNameRef.current.value = "";
      firstNameRef.current.value = "";
      signUpEmailRef.current.value = "";
      signUpPasswordRef.current.value = "";
    }
  }

  function clickHandle(num) {
    cleanAll(num);
    setSelected(num);
  }

  return (
    <div className="flex gradient  h-screen w-screen p-8">
      <div className="flex w-full justify-center h-full space-x-8">
        <div className="flex w-full max-w-600px sm:w-[500px] lg:w-[600px] xl:w-[40%] h-full overflow-auto scrollbar-hidden bg-white sm:scale-90 rounded-2xl items-center justify-center">
          <div className="rounded-3xl flex flex-col space-y-2 sm:space-y-4  py-2 sm:py-4 p-4   h-full w-full">
            <div className="flex justify-center m-4 mx-2 sm:mx-8 space-x-4 sm:space-x-8">
              <Button
                disabled={selected === 1}
                $status={selected === 1 ? "true" : "false"}
                onClick={() => clickHandle(1)}
                className="p-1 sm:p-2 px-4 flex sm:min-w-[170px] justify-center rounded-lg bg-[#9f21e3] border-2 border-[#9f21e3] text-white text-base sm:text-2xl font-semibold"
              >
                Log In
              </Button>
              <Button
                disabled={selected === 2}
                $status={selected === 2 ? "true" : "false"}
                onClick={() => clickHandle(2)}
                className="p-1 sm:p-2 px-4 flex sm:min-w-[170px] justify-center rounded-lg bg-[#9f21e3] border-2 border-[#9f21e3] text-white  text-base sm:text-2xl font-semibold"
              >
                Sign Up
              </Button>
            </div>

            {selected === 2 ? (
              <div className="flex flex-col sm:mx-4 p-2 sm:p-4 flex-grow justify-between">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-3 rounded-xl">
                    <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                      First Name
                    </span>
                    <input
                      className="p-2 px-3 bg-stone-100 focus:py-3 sm:focus:py-4 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                      placeholder="John"
                      type="text"
                      ref={firstNameRef}
                      onChange={() => setSignUpError(null)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 rounded-xl">
                    <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                      Last Name
                    </span>
                    <input
                      className="p-2 px-3 bg-stone-100 focus:py-3 sm:focus:py-4 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                      placeholder="Doe"
                      type="text"
                      ref={LastNameRef}
                      onChange={() => setSignUpError(null)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 rounded-xl">
                    <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                      Email
                    </span>
                    <input
                      className="p-2 px-3 bg-stone-100 focus:py-3 sm:focus:py-4 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                      placeholder="JohnDoe123@gmail.com"
                      type="text"
                      ref={signUpEmailRef}
                      onChange={() => setSignUpError(null)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 rounded-xl">
                    <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                      Password
                    </span>
                    <input
                      className="p-2 px-3 bg-stone-100 focus:py-3 sm:focus:py-4 duration-700 focus:outline-none flex rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                      placeholder="Password"
                      type="password"
                      ref={signUpPasswordRef}
                      onChange={() => setSignUpError(null)}
                    />
                  </div>
                </div>

                <div className="pt-[20px] mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between">
                  <p className="text-black flex items-center justify-center text-center sm:text-start text-xs sm:text-sm p-1 h-[60px] px-4">
                    {signUpError}
                  </p>
                  {signUpLoading ? (
                    <div className="p-2 px-6 text-center min-w-[130px] text-black text-base sm:text-xl font-semibold tracking-wide">
                      Signing Up...
                    </div>
                  ) : (
                    <button
                      onClick={signUp}
                      className="p-2 px-6 bg-[#9f21e3] border-2 border-[#9f21e3] min-w-[130px] text-white sm:text-xl font-bold rounded-lg duration-500 hover:shadow-xl hover:scale-110 hover:bg-white hover:text-[#9f21e3]"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-grow sm:mx-4 p-2 sm:p-4 ">
                <div className="flex flex-col space-y-2 mb-4 rounded-xl">
                  <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                    Email
                  </span>
                  <input
                    className="p-2 px-3 bg-stone-100 flex focus:py-3 sm:focus:py-4 duration-700 focus:outline-none rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                    placeholder="JohnDoe123@gmail.com"
                    type="text"
                    ref={logInEmailRef}
                    onChange={() => setLogInError(null)}
                  />
                </div>
                <div className="flex flex-col space-y-2 rounded-xl">
                  <span className="text-sm sm:text-lg text-black rounded-lg font-semibold p-1 px-2 w-fit">
                    Password
                  </span>
                  <input
                    className="p-2 px-3 bg-stone-100 flex focus:py-3 sm:focus:py-4 duration-700 focus:outline-none rounded-lg pl-4 sm:pl-8 text-sm sm:text-lg flex-grow "
                    placeholder="Password"
                    type="password"
                    ref={logInPasswordRef}
                    onChange={() => setLogInError(null)}
                  />
                </div>
                <div className="pt-[20px] flex flex-col sm:flex-row space-y-4 sm:space-y-0 mt-auto justify-between">
                  <p className="text-black flex items-center text-xs justify-center sm:justify-start  text-center sm:text-start sm:text-sm p-1 h-[60px] px-4">
                    {logInError}
                  </p>
                  {logInLoading ? (
                    <div className="p-2 px-6  text-center min-w-[130px] text-black sm:text-xl font-semibold tracking-wide">
                      Logging In...
                    </div>
                  ) : (
                    <button
                      onClick={logIn}
                      className="p-2 px-6 bg-[#9f21e3] border-2 border-[#9f21e3] min-w-[130px] text-white sm:text-xl font-bold rounded-lg duration-500 hover:shadow-xl hover:scale-110 hover:bg-white hover:text-[#9f21e3]"
                    >
                      Log In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%] hidden xl:flex relative h-full rounded-3xl bgLogin">
          <div
            style={{ fontFamily: styling.logoFont }}
            className="text-[50px] font-bold text-black font p-4 pt-2 px-6 bg-white rounded-b-3xl absolute top-p right-[100px]"
          >
            BILLBUD
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        onClose={close}
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}
