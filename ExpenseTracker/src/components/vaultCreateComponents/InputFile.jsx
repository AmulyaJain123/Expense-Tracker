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
  const previews = useSelector((state) => state.vault.previews);
  const fileError = useSelector((state) => state.vault.fileError);

  useImperativeHandle(ref, () => {
    return {};
  });

  useEffect(() => {
    if (fileError.error != null || files.length === 0) {
      dispatch(vaultActions.setFileValidation(false));
    } else {
      dispatch(vaultActions.setFileValidation(true));
    }
  }, [fileError, files]);

  function fileUpload(event) {
    const res = validateFileUpload(event.target.files[0]);
    if (res != null) {
      const str = `ERROR: FileName "${event.target.files[0].name}" - ${res}`;
      const obj = {
        file: event.target.files[0].name,
        error: str,
      };
      dispatch(vaultActions.setFileError(obj));
    }
    const file = {
      name: event.target.files[0].name,
      size: event.target.files[0].size,
      type: event.target.files[0].type,
    };
    const preview = URL.createObjectURL(event.target.files[0]);
    dispatch(vaultActions.pushFile(file));
    dispatch(vaultActions.pushPreview(preview));
  }

  return (
    <>
      <div className="bg-white zigzag w-[800px] pb-[100px]">
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
            return <ImageThumbs key={Math.random()} ind={index} />;
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
