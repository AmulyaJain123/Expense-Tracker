import { useState, useRef, useEffect } from "react";
import { formatVal } from "../../util/algo";

export default function DataDisplay({ data }) {
  const [sorter, setSorter] = useState({ field: "date", order: "decreasing" });
  const [sortedData, setSortedData] = useState(
    JSON.parse(JSON.stringify(data))
  );
  const [selectedField, setSelectedField] = useState("date");
  const dialogRef = useRef();
  const fieldRef = useRef();
  const orderRef = useRef();

  useEffect(() => {
    const arr = JSON.parse(JSON.stringify(data));
    arr.sort((a, b) => {
      // console.log("sorting", sorter);
      if (sorter.field === "name") {
        if (sorter.order === "decreasing") {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "to") {
        if (sorter.order === "decreasing") {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "from") {
        if (sorter.order === "decreasing") {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "amount") {
        if (sorter.order === "decreasing") {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "date") {
        const ad = new Date(a.dateTime);
        const bd = new Date(b.dateTime);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (ad > bd) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (ad > bd) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    setSortedData(JSON.parse(JSON.stringify(arr)));
  }, [data]);

  useEffect(() => {
    const arr = JSON.parse(JSON.stringify(data));
    arr.sort((a, b) => {
      // console.log("sorting", sorter);
      if (sorter.field === "name") {
        if (sorter.order === "decreasing") {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionName === b.transactionName) {
            return 0;
          } else if (a.transactionName > b.transactionName) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "to") {
        if (sorter.order === "decreasing") {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.to === b.to) {
            return 0;
          } else if (a.to > b.to) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "from") {
        if (sorter.order === "decreasing") {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.from === b.from) {
            return 0;
          } else if (a.from > b.from) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "amount") {
        if (sorter.order === "decreasing") {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.transactionAmount === b.transactionAmount) {
            return 0;
          } else if (a.transactionAmount > b.transactionAmount) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      if (sorter.field === "date") {
        const ad = new Date(a.dateTime);
        const bd = new Date(b.dateTime);
        if (sorter.order === "decreasing") {
          if (ad === bd) {
            return 0;
          } else if (ad > bd) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (ad === bd) {
            return 0;
          } else if (ad > bd) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    // console.log(arr);
    setSortedData(arr);
  }, [sorter]);

  function formatNum(num) {
    const n = parseInt(num);
    if (n < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function sortClick() {
    setSelectedField(sorter.field);
    dialogRef.current.showModal();
  }

  function selectChange(event) {
    setSelectedField(event.target.value);
  }

  function applyClick() {
    const f = fieldRef.current.value;
    const o = orderRef.current.value;
    // console.log(f, o);
    setSorter({ field: f, order: o });
    dialogRef.current.close();
  }

  function modalClose() {
    dialogRef.current.close();
  }
  // console.log("sorter", sorter);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="h-[200px] relative w-[700px] bg-stone-100 rounded-xl"
      >
        <div className="m-4 flex flex-col flex-grow h-[150px]">
          <header className="text-xl font-bold flex justify-center">
            Choose the Sorter
          </header>
          <div className="mt-4 w-full pt-[20px] flex text-lg font-semibold space-x-4">
            <select
              onChange={(event) => selectChange(event)}
              value={selectedField}
              className="p-2 px-6 flex-grow flex-0.3 rounded-md bg-[#fff]"
              name=""
              id=""
              ref={fieldRef}
            >
              <option value="name">Name</option>
              <option value="from">From</option>
              <option value="to">To</option>
              <option value="amount">Amount</option>
              <option value="date">Date</option>
            </select>
            <select
              name=""
              className="p-2 px-6 flex-grow flex-0.5 rounded-md bg-[#fff]"
              id=""
              ref={orderRef}
            >
              {selectedField === "date" || selectedField === "amount" ? (
                <>
                  <option value="increasing">Ascending</option>
                  <option value="decreasing">Descending</option>
                </>
              ) : (
                <>
                  <option value="increasing">Alphabatically A-Z </option>
                  <option value="decreasing">Alphabatically Z-A</option>
                </>
              )}
            </select>
            <button
              onClick={applyClick}
              className="p-2 px-6 flex-grow flex-0.2 rounded-md bg-[black] text-white border-2 border-black hover:bg-white hover:text-black duration-500"
            >
              Apply
            </button>
          </div>
        </div>
        <form method="dialog" className="absolute bottom-[10px] right-[10px]">
          <button
            type="button"
            onClick={modalClose}
            className="p-1 px-3 rounded-md bg-red-400 text-white font-semibold text-lg "
          >
            Close
          </button>
        </form>
      </dialog>
      <header className="flex border-b-[2px] border-stone-500 pb-2 mr-4 space-x-8 text-md font-semibold text-stone-500 pl-2 p-1 px-4">
        <div className="flex-[0.18] flex space-x-3  min-w-[200px]">
          <span className="flex justify-center items-center">Name</span>
          <div>
            {sorter.field === "name" ? (
              <button
                onClick={sortClick}
                className="p-1 px-3 flex hover:scale-x-[107%] duration-500 items-center bg-[#9d4edd] text-white text-base font-medium rounded-md"
              >
                {sorter.order === "increasing" ? "A-Z" : "Z-A"}
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex-[0.14]  flex space-x-3 ">
          <span className="flex justify-center items-center">From</span>
          <div>
            {sorter.field === "from" ? (
              <button
                onClick={sortClick}
                className="p-1 px-3 flex hover:scale-x-[107%] duration-500 items-center bg-[#9d4edd] text-white text-base font-medium rounded-md"
              >
                {sorter.order === "increasing" ? "A-Z" : "Z-A"}
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex-[0.12]  flex space-x-3 ">
          <span className="flex justify-center items-center">Amount</span>
          <div>
            {sorter.field === "amount" ? (
              <button
                onClick={sortClick}
                className="p-1 px-3 flex hover:scale-x-[107%] duration-500 items-center bg-[#9d4edd] text-white text-base font-medium rounded-md"
              >
                {sorter.order === "decreasing" ? "Desc" : "Asc"}
              </button>
            ) : null}
          </div>
        </div>
        <div className=" flex-[0.14] flex space-x-3 ">
          <span className="flex justify-center items-center">To</span>
          <div>
            {sorter.field === "to" ? (
              <button
                onClick={sortClick}
                className="p-1 px-3 flex hover:scale-x-[107%] duration-500 items-center bg-[#9d4edd] text-white text-base font-medium rounded-md"
              >
                {sorter.order === "increasing" ? "A-Z" : "Z-A"}
              </button>
            ) : null}
          </div>
        </div>
        <div className=" flex-[0.17] flex space-x-3 ">
          <span className="flex justify-center items-center">Date</span>
          <div>
            {sorter.field === "date" ? (
              <button
                onClick={sortClick}
                className="p-1 px-3 flex hover:scale-x-[107%] duration-500 items-center bg-[#9d4edd] text-white text-base font-medium rounded-md"
              >
                {sorter.order === "decreasing" ? "Desc" : "Asc"}
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex-[0.15]  flex space-x-3 ">Category</div>
        <div className="flex-[0.1]  flex space-x-3">Type</div>
      </header>
      <div className="flex flex-col pt-4 space-y-3 h-[700px] overflow-auto customScroll pr-2">
        {sortedData.length === 0 ? (
          <p className="mt-[50px] mx-auto text-lg font-medium">
            No Transactions
          </p>
        ) : (
          <>
            {sortedData.map((i) => {
              const {
                category,
                dateTime,
                from,
                to,
                transactionAmount,
                transactionName,
                transactionType,
              } = i;

              const date = `${formatNum(
                new Date(dateTime).getDate()
              )}/${formatNum(new Date(dateTime).getMonth() + 1)}/${new Date(
                dateTime
              ).getFullYear()}`;

              const time = `${formatNum(
                new Date(dateTime).getHours()
              )}:${formatNum(new Date(dateTime).getMinutes())}`;

              return (
                <div
                  key={Math.random()}
                  className="flex rounded-sm border-b-2 border-[#adb5bd] bg-[#f8f9fa] text-black space-x-8 p-1 py-2 px-4"
                >
                  <span className="flex-[0.18]  ">{transactionName}</span>
                  <span className="flex-[0.14]   ">{from}</span>
                  <span className="flex-[0.12]   ">
                    {formatVal(transactionAmount)}
                  </span>
                  <span className=" flex-[0.14]  ">{to}</span>
                  <span className=" flex-[0.17]  ">
                    {date}&nbsp; &nbsp; {time}
                  </span>
                  <span className="flex-[0.15]  ">{category}</span>
                  <span
                    style={{
                      color:
                        transactionType === "Outgoing" ? "blue" : "#55a630",
                    }}
                    className="flex-[0.1] font-semibold "
                  >
                    {transactionType}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
