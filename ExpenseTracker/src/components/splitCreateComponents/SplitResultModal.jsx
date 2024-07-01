import { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { styling } from "../../util/styling";
import { useState } from "react";

const Modal = styled.dialog`
  background-color: ${styling.splitResultModalBgCol};
`;
const Headings = styled.header`
  background-color: ${styling.splitResultModalTitleBgCol};
`;
const Bottom = styled.div`
  background-color: ${styling.splitResultModalTitleBgCol};
`;

const SplitResultModal = forwardRef(function SplitResultModal(
  { ...rest },
  ref
) {
  const dialog = useRef();
  const [data, setData] = useState([]);

  useImperativeHandle(ref, () => {
    return {
      open(res) {
        console.log(res);
        setData(res);
        dialog.current.showModal();
      },
    };
  });

  return (
    <Modal
      ref={dialog}
      className="rounded-3xl border-black border-[3px] w-[1000px] h-[90vh] "
    >
      <div className="flex flex-col w-full h-full">
        <Headings className="text-2xl border-black border-b-[3px] p-[20px] px-[40px] rounded-t-3xl font-bold ">
          <span className="mr-3">Yay!! Bills are Splitted</span>
          <span className="text-3xl">&#129321;</span>
        </Headings>
        <p className="p-2 ml-[30px]">
          Following are the minimized Transactions:
        </p>
        <div className="w-full px-[200px] flex-grow  p-4 py-8 overflow-auto">
          {data.length === 0 ? (
            <p className="text-lg mt-2 w-full text-center">
              No Transactions Needed.
            </p>
          ) : (
            <table className="">
              <thead>
                <th>Sender</th>
                <th>Reciever</th>
                <th>Amount</th>
              </thead>
              <tbody>
                {data.map((obj) => {
                  return (
                    <tr>
                      <td>
                        <span className="p-1 px-2  rounded-md bg-white font-semibold">
                          {obj.start}
                        </span>
                      </td>
                      <td>
                        <span className="p-1 px-2  rounded-md bg-white font-semibold">
                          {obj.end}
                        </span>
                      </td>
                      <td>
                        <span className="p-1 px-2 w-fit mx-auto flex  items-center rounded-md bg-white font-semibold">
                          <span className="mr-3">{obj.amount}</span>
                          <span>&#8377;</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <Bottom className="ml-auto border-black border-t-[3px] w-full pl-[600px] p-8 ">
          <form className="flex  mt-auto gap-x-2" method="dialog">
            <button className="w-[50%] py-2 shadow-lg text-white font-semibold hover:bg-white mr hover:text-red-500 border-red-500 border-[2px] hover:translate-y-[-3px] duration-[0.3s] rounded-lg bg-red-500 text-lg ">
              Cancel
            </button>
            <button
              className="w-[50%] py-2 shadow-lg text-white font-semibold hover:bg-white hover:text-green-500 border-green-500 border-[2px] hover:translate-y-[-3px] duration-[0.3s] rounded-lg bg-green-500 text-lg "
              type="button"
            >
              Save
            </button>
          </form>
        </Bottom>
      </div>
    </Modal>
  );
});

export default SplitResultModal;
