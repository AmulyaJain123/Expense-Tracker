import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { vaultActions } from "../../store/main";
import { useSelector } from "react-redux";
import ImageThumbs from "./ImageThumbs";
import Preview from "./Preview";
import { validateFileUpload } from "../../util/algo";
import ErrorElement from "./ErrorElement";
import { forwardRef, useImperativeHandle } from "react";

const InputFile = forwardRef(function InputFile({ ...props }, ref) {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.vault.files);
  const [fileObj, setFileObj] = useState([]);
  const fileError = useSelector((state) => state.vault.fileError);

  useImperativeHandle(ref, () => {
    return {
      getData() {
        console.log(fileObj);
        const fileObjects = [...fileObj];
        return { fileObjects };
      },
    };
  });

  useEffect(() => {
    if (fileError.error != null || files.length === 0) {
      dispatch(vaultActions.setFileValidation(false));
    } else {
      dispatch(vaultActions.setFileValidation(true));
    }
  }, [fileError, files]);

  function fileUpload(event) {
    const enteredFile = event.target.files[0];
    const res = validateFileUpload(enteredFile);
    setFileObj((preval) => {
      const file = enteredFile;
      console.log("nextFile", file);
      return [...preval, file];
    });
    if (res != null) {
      const str = `ERROR: FileName "${enteredFile.name}" - ${res}`;
      const obj = {
        file: enteredFile.name,
        error: str,
      };
      dispatch(vaultActions.setFileError(obj));
    }
    console.log("File", event.target.files[0]);
    const file = {
      name: enteredFile.name,
      size: enteredFile.size,
      type: enteredFile.type,
    };
    const preview = URL.createObjectURL(enteredFile);
    dispatch(vaultActions.pushFile(file));
    dispatch(vaultActions.pushPreview(preview));
    event.target.value = "";
  }

  function removeFileObj(ind) {
    setFileObj((preval) => {
      let newArr = [...preval];
      newArr.splice(ind, 1);
      return newArr;
    });
  }

  return (
    <>
      <div className="bg-white zigzag w-[750px] pb-[100px]">
        <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[60px] text-2xl uppercase font-bold">
          Add Files
        </div>
        <div className="flex h-[20px] mb-[20px]">
          <div className="billCuts h-[20px] w-[20px] rounded-r-full"></div>
          <div className="flex flex-col h-full flex-grow">
            <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
            <div className="h-1/2 w-full  border-stone-300"></div>
          </div>
          <div className="billCuts h-[20px] w-[20px] rounded-l-full"></div>
        </div>
        {fileError.error != null ? (
          <ErrorElement error={fileError.error} />
        ) : null}
        <div className="flex mt-4 mx-3 items-center space-x-4 p-2">
          {files.map((file, index) => {
            return (
              <ImageThumbs
                removeFileObj={removeFileObj}
                key={Math.random()}
                ind={index}
              />
            );
          })}
          {files.length < 4 ? (
            <div>
              <input
                className=""
                type="file"
                multiple={false}
                accept="image/png, image/jpg, image/jpeg"
                name=""
                onChange={(event) => fileUpload(event)}
                id="billImg1"
              />
              <label
                className="p-[6px] px-2 border-dashed cursor-pointer border-2 border-stone-300 rounded-lg bg-stone-100"
                htmlFor="billImg1"
              >
                + Add
              </label>
            </div>
          ) : null}
        </div>
        <Preview />
      </div>
    </>
  );
});

export default InputFile;
