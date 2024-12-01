import { useSelector } from "react-redux";
import { validateFileUpload } from "../../util/algo";
import styles from "./Preview.module.css";

export default function Preview() {
  const files = useSelector((state) => state.vault.files);
  const previews = useSelector((state) => state.vault.previews);
  const fileInd = useSelector((state) => state.vault.fileInd);
  const fileError = useSelector((state) => state.vault.fileError);
  //console.log(files, previews, fileInd);
  function formatSize(val) {
    const newVal = parseFloat(val) / 1024;
    let str = newVal + "";
    if (!str.includes(".")) {
      str += ".00";
    }
    const integer = str.split(".")[0];
    let fraction = str.split(".")[1];
    if (fraction.length > 2) {
      fraction = fraction.substring(0, 2);
    }
    const newStr = integer + "." + fraction + " KB";
    return newStr;
  }

  return (
    <>
      {fileInd != null ? (
        <div className={`${styles.main}`}>
          <div className="flex flex-col w-full space-y-2">
            <div className=" hidden sm:flex w-full">
              <span className="p-2 px-4 underline underline-offset-8   w-[60%] font-semibold">
                Name
              </span>
              <span className="p-2 px-4 underline underline-offset-8   w-[16%] font-semibold">
                Size
              </span>
              <span className="p-2 px-4 underline underline-offset-8   w-[24%] font-semibold">
                Type
              </span>
            </div>
            <div className="flex flex-col items-center text-center sm:text-start sm:items-start sm:flex-row w-full">
              <span className="p-3 pt-1 px-4  sm:w-[60%] font-medium">
                {files[fileInd].name.slice(0, 30) +
                  (files[fileInd].name.length > 30 ? "..." : "")}
              </span>
              <span className="p-3 pt-1 px-4   sm:w-[16%] font-medium">
                {formatSize(files[fileInd].size)}
              </span>
              <span className="p-3 pt-1 px-4   sm:w-[24%] font-medium">
                {files[fileInd].type}
              </span>
            </div>
          </div>
          <div className="h-[400px] xl:h-[800px] mt-[50px] mx-auto overflow-auto px-2 customScroll">
            {validateFileUpload(files[fileInd]) != null ? (
              <p>Preview Unavailable</p>
            ) : (
              <img className="" src={previews[fileInd]} alt="" />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-[150px]">
          <p className="text-center p-3 pb-2">You can add upto 4 files</p>
          <p className="text-center px-3 pb-2">
            <span className="sm:mr-3">Supported Extensions:</span>
            <div className="mt-[10px] sm:mt-0 sm:inline">
              <span className="rounded-md bg-stone-200 p-1 px-2 mr-3">
                . jpg
              </span>
              <span className="rounded-md bg-stone-200 p-1 px-2 mr-3">
                . png
              </span>
              <span className="rounded-md bg-stone-200 p-1 px-2">. jpeg</span>
            </div>
          </p>
          <p className="text-center px-3">Maximum Supported File Size: 2 MB</p>
          <p className="text-center mt-8 px-3">
            NOTE: Browser Extensions might delay or cancel Upload{" "}
          </p>
        </div>
      )}
    </>
  );
}
