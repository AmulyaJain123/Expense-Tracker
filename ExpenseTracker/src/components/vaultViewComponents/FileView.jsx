import { useState } from "react";
import styled from "styled-components";
import noImg from "../../assets/noImg.jpg";
import loadingIcon from "../../assets/loading-circle.gif";

const Button = styled.button`
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "#e7e5e4"};
  border: ${(props) =>
    props.$status === "true" ? "solid 2px #9d4edd" : "solid 2px #a8a29e"};
  color: ${(props) => (props.$status === "true" ? "white" : "#57534e")};

  &:hover {
    scale: ${(props) => (props.$status === "true" ? "100%" : "105%")};
  }
`;

export default function FileView({ data }) {
  // console.log(data[0]);
  const [currUrl, setcurrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  function clickThumb(url) {
    setcurrUrl(url);
    setLoading(true);
  }

  function errorDeal(event) {
    // console.log(event, event.target);
    console.dir(event.target);
    event.target.src = noImg;
  }

  function loadComplete() {
    setLoading(false);
    // console.log("completed");
  }

  return (
    <div className="bg-white zigzag w-[750px] pb-[100px]">
      <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[60px] text-2xl uppercase font-bold">
        Files
      </div>
      <div className="flex h-[20px] mb-[20px]">
        <div className="billCuts-stone h-[20px] w-[20px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
          <div className="h-1/2 w-full  border-stone-300"></div>
        </div>
        <div className="billCuts-stone h-[20px] w-[20px] rounded-l-full"></div>
      </div>
      <div className="flex mt-4 mx-3 items-center space-x-4 p-2">
        {data.map((image, index) => {
          return (
            <Button
              key={image}
              disabled={image === currUrl}
              $status={image === currUrl ? "true" : "false"}
              onClick={() => clickThumb(image)}
              className="p-1 px-2 rounded-md duration-500"
            >{`Image ${index + 1}`}</Button>
          );
        })}
      </div>
      <div className="flex h-[100px] justify-center">
        {currUrl != null && loading === false ? (
          <a
            className="text-lg p-1 h-fit mt-[30px] hover:scale-110 hover:shadow-xl mx-auto px-2 m-4 rounded-lg bg-black text-white duration-500 hover:bg-white hover:text-black border-2 border-black"
            href={currUrl}
            target="_blank"
          >
            Download
          </a>
        ) : null}
        {loading === true ? (
          <img src={loadingIcon} className="w-auto mt-[30px] h-[50px]" alt="" />
        ) : null}
      </div>
      <div className="mt-[10px] h-[700px] overflow-auto px-10 mx-2 customScroll">
        {currUrl != null ? (
          <img
            src={currUrl}
            className="mx-auto billImg max-w-[400px] max-h-[900px]"
            onLoad={loadComplete}
            alt="Image"
            onError={(event) => errorDeal(event)}
          />
        ) : (
          <p className="mt-[20px]  text-center">No Image Selected</p>
        )}
      </div>
    </div>
  );
}
