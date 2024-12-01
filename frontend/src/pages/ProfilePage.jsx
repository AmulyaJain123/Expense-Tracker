import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { universalActions } from "../store/main";
import user from "../assets/user.png";
import qr from "../assets/qr.png";
import pencil from "../assets/edit-pencil.png";
import tick from "../assets/tick.png";
import cross from "../assets/cross.png";
import load from "../assets/loader.gif";
import exclamation from "../assets/exclamation.png";
import bill from "../assets/sideNavImages/bill-solid.png";
import vault from "../assets/sideNavImages/vault-solid.png";
import split from "../assets/sideNavImages/split-solid.png";
import profile from "../assets/sideNavImages/profile-solid.png";

import { useRef, useState } from "react";

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProfilePage() {
  const data = useLoaderData();
  const [editName, setEditName] = useState(false);
  const nameRef = useRef();
  const upiRef = useRef();
  const profilePicFormRef = useRef();
  const [editUpi, setEditUpi] = useState(false);
  const [nameEditLoading, setNameEditLoading] = useState(false);
  const [upiEditLoading, setUpiEditLoading] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [profilePicError, setProfilePicError] = useState(null);
  const [profilePicUploadLoading, setProfilePicUploadLoading] = useState(false);

  const profilePicRef = useRef();
  const dispatch = useDispatch();

  function formatDate(str) {
    const date = new Date(str);
    const day = date.getDate();
    const month = monthArr[date.getMonth()].substring(0, 3);
    const year = date.getFullYear();
    const ntr = "" + day + " " + month + " " + year;
    return ntr;
  }

  function cancelEditName() {
    nameRef.current.value = data.username;
    setEditName(false);
    setNameEditLoading(false);
  }

  async function confirmEditName() {
    const newUsername = nameRef.current.value.trim();
    setNameEditLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/profile/changeusername",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUsername,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      setNameEditLoading(false);
      data.username = newUsername;
      dispatch(universalActions.changeUserInfo({ username: newUsername }));
      setEditName(false);
    } catch (err) {
      console.log(err);
      setNameEditLoading(null);
    }
  }

  function cancelEditUpi() {
    upiRef.current.value = data.upiId || "NOT ENTERED";
    setEditUpi(false);
    setUpiEditLoading(false);
  }

  function upiPencilClick() {
    setEditUpi(true);
    if (data.upiId === null) {
      upiRef.current.value = "";
    }
  }

  async function confirmEditUpi() {
    const newUpiId = upiRef.current.value.trim();
    setUpiEditLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/profile/changeupi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upiId: newUpiId,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      if (newUpiId != "") {
        data.upiId = newUpiId;
      } else {
        data.upiId = null;
      }
      if (newUpiId === "") {
        upiRef.current.value = "NOT ENTERED";
      }
      setUpiEditLoading(false);
      setEditUpi(false);
    } catch (err) {
      console.log(err);
      setUpiEditLoading(null);
    }
  }

  function profilePicClick() {
    profilePicRef.current.click();
  }

  function profilePicChange() {
    const file = profilePicRef.current.files[0];
    console.log(file);
    const { size, type } = file;
    if (size > 2097152) {
      setProfilePicError("Image must be less than 2MB.");
    } else if (
      ["image/png", "image/jpg", "image/jpeg"].includes(type) === false
    ) {
      setProfilePicError("Image must be png, jpg or jpeg file.");
    } else {
      setProfilePicError(null);
      const reader = new FileReader();
      reader.onload = function (e) {
        const src = e.target.result;
        console.log(src);
        setProfilePicUrl(src);
      };
      reader.readAsDataURL(file);
    }
  }

  function cancelProfilePicUpload() {
    setProfilePicError(null);
    setProfilePicUploadLoading(false);
    setProfilePicUrl(null);
    profilePicRef.current.value = "";
  }

  async function confirmProfilePicUpload() {
    setProfilePicUploadLoading(true);
    const formdata = new FormData(profilePicFormRef.current);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/profile/profilepicupload",
        {
          method: "POST",
          body: formdata,
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      }
      const result = await res.json();
      setProfilePicUploadLoading(false);
      setProfilePicError(null);
      setProfilePicUrl(null);
      profilePicRef.current.value = "";
      console.log(result);
      data.profilePic = result.url;
    } catch (err) {
      console.log(err);
      setProfilePicUploadLoading(false);
      setProfilePicError("Something went wrong.");
    }
  }
  return (
    <div className="h-full w-full bg-white pb-[100px] overflow-auto text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
      <h1 className="text-[40px] text-stone-700 text-center mt-12 font-extrabold">
        My Profile
      </h1>
      <div className="flex justify-center space-x-32 mt-24 ">
        <div className="flex flex-col gap-y-32 items-center mb-24">
          <div className="  mt-12  ">
            <div className="bg-neutral-100 relative p-8 rounded-full">
              {data.profilePic ? (
                <img
                  src={data.profilePic}
                  className="w-[250px] h-[250px] rounded-full"
                  alt=""
                />
              ) : profilePicUrl === null ? (
                <img
                  src={user}
                  className="w-[250px] h-[250px] blur-sm rounded-full"
                  alt=""
                />
              ) : (
                <img
                  src={profilePicUrl}
                  className="w-[250px] h-[250px] rounded-full"
                  alt=""
                />
              )}
              {profilePicUrl ? (
                <>
                  <div className="absolute top-[-10px] flex space-x-6 right-[-80px] translate-y-[-100%]">
                    <button
                      disabled={profilePicUploadLoading}
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={cancelProfilePicUpload}
                    >
                      <img
                        src={cross}
                        className="w-[25px] hover:opacity-50 opacity-100 h-[25px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                    <button
                      disabled={profilePicUploadLoading}
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={confirmProfilePicUpload}
                    >
                      <img
                        src={tick}
                        className="w-[25px] hover:opacity-50 opacity-100 h-[25px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                    {profilePicUploadLoading === true ? (
                      <div className="absolute left-[-55px] translate-x-[-100%]">
                        <img
                          src={load}
                          className="w-[25px] h-[25px] flex justify-center items-center"
                          alt=""
                        />
                      </div>
                    ) : null}
                  </div>
                </>
              ) : data.profilePic ? (
                <button
                  onClick={profilePicClick}
                  className="absolute top-[50%] scale-90 hover:scale-100 duration-700 text-xl flex justify-center items-center px-5 h-[50px] bg-[#9F21E3] rounded-full font-extrabold text-white tracking-widest right-[50%] translate-x-[50%] translate-y-[-50%]"
                >
                  <img
                    src={pencil}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              ) : (
                <button
                  onClick={profilePicClick}
                  className="absolute top-[50%] scale-90 hover:scale-100 duration-700 text-xl flex justify-center items-center px-5 h-[50px] bg-[#9F21E3] rounded-full font-extrabold text-white tracking-widest right-[50%] translate-x-[50%] translate-y-[-50%]"
                >
                  UPLOAD
                </button>
              )}
            </div>

            <div className="flex items-center justify-center h-[50px] mt-8 text-red-500">
              {profilePicError ? (
                <>
                  <img
                    src={exclamation}
                    className="w-[20px] h-[20px] mr-2 flex justify-center items-center"
                    alt=""
                  />
                  <p className="">{profilePicError}</p>
                </>
              ) : null}
            </div>
            <form ref={profilePicFormRef} className="hidden">
              <input
                ref={profilePicRef}
                type="file"
                name="profilePic"
                multiple={false}
                onChange={profilePicChange}
                accept=".jpeg, .png, .jpg"
                className="hidden"
                id=""
              />
            </form>
          </div>
          <div className="flex flex-col">
            <span className="font-bold mb-2 text-lg mx-auto">STATS</span>
            <div className="flex flex-col">
              <div className="flex text-neutral-500 flex-col space-y-8 bg-neutral-100 px-8 rounded-lg  py-6 w-[400px]">
                <div className="flex justify-between rounded-md ">
                  <span className="font-semibold flex items-center uppercase">
                    <img
                      src={split}
                      className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
                      alt=""
                    />
                    <span>Splits</span>
                  </span>
                  <span>7</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold flex items-center uppercase">
                    <img
                      src={vault}
                      className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
                      alt=""
                    />
                    <span>Bills</span>
                  </span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold flex items-center uppercase">
                    <img
                      src={bill}
                      className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
                      alt=""
                    />
                    <span>Transactions</span>
                  </span>
                  <span>56</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold flex items-center uppercase">
                    <img
                      src={profile}
                      className="w-[20px] h-[20px] mr-3 flex justify-center items-center"
                      alt=""
                    />
                    <span>Friends</span>
                  </span>
                  <span>4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 max-w-[900px]">
          <div className="flex flex-col space-y-2 w-[500px]">
            <span className="font-semibold ">Username</span>
            <div className="relative ">
              <input
                defaultValue={data.username}
                disabled={!editName || nameEditLoading}
                ref={nameRef}
                style={{
                  cursor: !editName ? "default" : "auto",
                  outline: !editName ? "none" : "2px solid black",
                }}
                type="text"
                className="px-8 py-[10px] w-full disabled:text-neutral-500 text-base font-medium rounded-md bg-neutral-100 "
              />

              {!editName ? (
                <button
                  onClick={() => setEditName(true)}
                  className="absolute right-1 duration-500 rounded-md hover:bg-neutral-200 p-2 top-[50%] translate-y-[-50%]"
                >
                  <img
                    src={pencil}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                </button>
              ) : (
                <div className="absolute top-[-10px] flex space-x-4 right-2 translate-y-[-100%]">
                  <button
                    disabled={nameEditLoading}
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={cancelEditName}
                  >
                    <img
                      src={cross}
                      className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                  <button
                    disabled={nameEditLoading}
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={confirmEditName}
                  >
                    <img
                      src={tick}
                      className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                  {nameEditLoading === true ? (
                    <div className="absolute left-[-35px] translate-x-[-100%]">
                      <img
                        src={load}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  ) : nameEditLoading === null ? (
                    <div className="absolute flex text-red-500 items-center left-[-45px] translate-x-[-100%]">
                      <img
                        src={exclamation}
                        className="w-[16px] h-[16px] mr-2 flex justify-center items-center"
                        alt=""
                      />
                      Failed
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[500px]">
            <span className="font-semibold ">Email</span>
            <div className="px-8 py-2 text-neutral-500 text-base font-medium rounded-md bg-neutral-100 ">
              {data.email}
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[500px]">
            <span className="font-semibold ">User ID</span>
            <div className="px-8 py-2 text-neutral-500 text-lg font-medium rounded-md bg-neutral-100 ">
              <span className="text-neutral-400 mr-3">#</span>
              <span className="text-base">{data.userId}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[500px]">
            <span className="font-semibold ">Joined On</span>
            <div className="px-8 py-2 text-neutral-500 text-base font-medium rounded-md bg-neutral-100 ">
              {formatDate(data.joinedOn)}
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[500px]">
            <span className="font-semibold ">UPI ID</span>
            <div
              style={{ outline: !editUpi ? "none" : "2px solid black" }}
              className="pl-8 items-center text-lg font-medium rounded-md flex bg-neutral-100 "
            >
              <span className="text-neutral-400 mr-4">UPI</span>

              <div className="relative flex flex-grow">
                <input
                  defaultValue={data.upiId || "NOT ENTERED"}
                  disabled={!editUpi || upiEditLoading}
                  ref={upiRef}
                  style={{
                    cursor: !editUpi ? "default" : "auto",
                  }}
                  type="text"
                  className="px-8 py-[10px] w-full focus:outline-none disabled:text-neutral-500 text-base font-medium rounded-md bg-neutral-100 "
                />

                {!editUpi ? (
                  <button
                    onClick={upiPencilClick}
                    className="absolute right-1 duration-500 rounded-md hover:bg-neutral-200 p-2 top-[50%] translate-y-[-50%]"
                  >
                    <img
                      src={pencil}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </button>
                ) : (
                  <div className="absolute top-[-10px] flex space-x-4 right-2 translate-y-[-100%]">
                    <button
                      disabled={upiEditLoading}
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={cancelEditUpi}
                    >
                      <img
                        src={cross}
                        className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                    <button
                      disabled={upiEditLoading}
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={confirmEditUpi}
                    >
                      <img
                        src={tick}
                        className="w-[20px] hover:opacity-50 opacity-100 h-[20px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                    {upiEditLoading === true ? (
                      <div className="absolute left-[-35px] translate-x-[-100%]">
                        <img
                          src={load}
                          className="w-[20px] h-[20px] flex justify-center items-center"
                          alt=""
                        />
                      </div>
                    ) : upiEditLoading === null ? (
                      <div className="absolute flex text-red-500 items-center left-[-45px] translate-x-[-100%]">
                        <img
                          src={exclamation}
                          className="w-[16px] h-[16px] mr-2 flex justify-center items-center"
                          alt=""
                        />
                        Failed
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-[350px]">
            <span className="font-semibold ">QR Code</span>
            <div className="px-8 py-2 text-lg aspect-square flex justify-center items-center font-medium rounded-md bg-neutral-100 ">
              {data.qrCode ? (
                <div></div>
              ) : (
                <div className="w-[300px] relative h-[300px] flex justify-center items-center text-neutral-400 ">
                  <img src={qr} className="w-full h-full blur-sm" alt="" />
                  <button className="absolute top-[50%] hover:scale-110 duration-700 text-xl flex justify-center items-center px-5 h-[50px] bg-[#9F21E3] rounded-full font-extrabold text-white tracking-widest right-[50%] translate-x-[50%] translate-y-[-50%]">
                    UPLOAD
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
