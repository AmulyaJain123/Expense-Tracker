import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { universalActions } from "../../store/main";
import qr from "../../assets/qr.png";
import pencil from "../../assets/edit-pencil.png";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import load from "../../assets/loader.gif";
import exclamation from "../../assets/exclamation.png";

export default function QRPic({ data }) {
  const profilePicFormRef = useRef();
  const profilePicRef = useRef();
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [profilePicError, setProfilePicError] = useState(null);
  const [profilePicUploadLoading, setProfilePicUploadLoading] = useState(true);
  const dispatch = useDispatch();

  function profilePicClick() {
    profilePicRef.current.click();
  }

  async function profilePicChange() {
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
      const formdata = new FormData(profilePicFormRef.current);
      try {
        setProfilePicUploadLoading(true);
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/profile/qrcodepreview",
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
        setProfilePicUrl(result.url);
        setProfilePicError(null);
      } catch (err) {
        console.log(err);
        setProfilePicUploadLoading(false);
        setProfilePicError("Something went wrong.");
        profilePicRef.current.value = "";
      }
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
        import.meta.env.VITE_BACKEND_API + "/profile/qrcodeupload",
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
      setProfilePicError(null);
      setProfilePicUrl(null);
      profilePicRef.current.value = "";
      console.log(result);
      data.qrCode = result.url;
    } catch (err) {
      console.log(err);
      setProfilePicUploadLoading(false);
      setProfilePicError("Something went wrong.");
    }
  }
  //   {data.qrCode ? (
  //                   <div></div>
  //                 ) : (
  //                   <div className="w-[250px] relative h-[250px] flex justify-center items-center text-neutral-500 ">
  //                     <img src={qr} className="w-full h-full blur-sm" alt="" />
  //                     <div className="absolute top-[50%] text-nowrap bg-neutral-100 px-5 h-[40px] flex justify-center items-center  rounded-full  right-[50%] translate-x-[50%] translate-y-[-50%]">
  //                       UPI ID NOT ENTERED
  //                     </div>
  //                   </div>
  //                 )}
  return (
    <>
      <div className="    ">
        <div className="bg-neutral-100 relative p-6 rounded-lg ">
          <div className={profilePicUploadLoading ? "blur-sm" : ""}>
            {data.qrCode && !profilePicUrl ? (
              <img
                src={data.qrCode}
                onLoad={() => setProfilePicUploadLoading(false)}
                className="w-[250px] h-[250px] "
                alt=""
              />
            ) : profilePicUrl === null ? (
              <img
                src={qr}
                onLoad={() => setProfilePicUploadLoading(false)}
                className="w-[250px] h-[250px] blur-sm "
                alt=""
              />
            ) : (
              <img
                src={profilePicUrl}
                onLoad={() => setProfilePicUploadLoading(false)}
                className="w-[250px] h-[250px] object-cover object-center"
                alt=""
              />
            )}
          </div>
          {profilePicUploadLoading === true ? (
            <>
              <div className="absolute top-[50%] p-2 bg-neutral-100 right-[50%] rounded-full translate-x-[50%] translate-y-[-50%]">
                <img
                  src={load}
                  className="w-[40px] h-[40px]  flex justify-center items-center"
                  alt=""
                />
              </div>
            </>
          ) : null}
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
              </div>
            </>
          ) : data.qrCode ? (
            <button
              onClick={profilePicClick}
              disabled={profilePicUploadLoading}
              className="absolute bottom-[10px] disabled:pointer-events-none disabled:opacity-50 scale-90 hover:scale-100 border-neutral-300 border-2 duration-700 text-xl flex justify-center items-center p-3 h-[50px] bg-[#fff] rounded-full font-extrabold text-white tracking-widest right-[10px]"
            >
              <img
                src={pencil}
                className="w-[25px] h-[25px] flex justify-center items-center"
                alt=""
              />
            </button>
          ) : (
            <button
              onClick={profilePicClick}
              disabled={profilePicUploadLoading}
              className="absolute bottom-[50px]  scale-90 disabled:opacity-50 disabled:pointer-events-none hover:scale-100 duration-700 text-xl flex  justify-center items-center px-5 h-[50px] bg-[#9F21E3] rounded-full font-extrabold text-white tracking-widest right-[50%] translate-x-[50%] "
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
              <p className="font-normal text-base">{profilePicError}</p>
            </>
          ) : null}
        </div>
        <form ref={profilePicFormRef} className="hidden">
          <input
            ref={profilePicRef}
            type="file"
            name="qrCode"
            multiple={false}
            onChange={profilePicChange}
            accept=".jpeg, .png, .jpg"
            className="hidden"
            id=""
          />
        </form>
      </div>
    </>
  );
}