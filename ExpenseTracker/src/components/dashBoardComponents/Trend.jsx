import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import more from "../../assets/open-book.gif";
import { getData } from "../../util/distribution";
import { useFirebase } from "../../store/firebase-context";
import {
  Legend,
  Line,
  LineChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import numeral from "numeral";

export default function Trend() {
  const [data, setData] = useState(null);
  const [select1, setSelect1] = useState();
  const firebase = useFirebase();
  const [fetching, setFetching] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function fetch() {
      setFetching("Fetching....");
      const res = await firebase.fetchAllTransactions();
      if (res === "error") {
        setFetching("ERROR: Cannot Fetch Data");
      } else {
        setData(res);
        setFetching(null);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (data != null) {
      const obj = [
        { name: "Jan", Outgoing: 0, Incoming: 0 },
        { name: "Feb", Outgoing: 0, Incoming: 0 },
        { name: "Mar", Outgoing: 0, Incoming: 0 },
        { name: "Apr", Outgoing: 0, Incoming: 0 },
        { name: "May", Outgoing: 0, Incoming: 0 },
        { name: "Jun", Outgoing: 0, Incoming: 0 },
        { name: "Jul", Outgoing: 0, Incoming: 0 },
        { name: "Aug", Outgoing: 0, Incoming: 0 },
        { name: "Sep", Outgoing: 0, Incoming: 0 },
        { name: "Oct", Outgoing: 0, Incoming: 0 },
        { name: "Nov", Outgoing: 0, Incoming: 0 },
        { name: "Dec", Outgoing: 0, Incoming: 0 },
      ];
      for (let i of data) {
        const date = i.dateTime.toDate();
        if (date.getFullYear() === year) {
          obj[date.getMonth()][i.transactionType] += i.transactionAmount;
        }
      }
      // console.log(obj);
      setTransactions(obj);
    }
  }, [year, data]);

  function yearClick(num) {
    setYear((preval) => preval + num);
  }

  function formatTick(val) {
    // console.log(val);
    return `${numeral(val).format("0,0")}₹`;
  }

  function toolTipFormat(name, value, props) {
    return `${numeral(name).format("0,0.00")} ₹`;
  }

  // console.log(data);
  return (
    <div className="flex flex-col relative p-4  rounded-2xl mx-4 min-h-[600px] overflow-hidden bg-[#f7ebfd]">
      <div className=" flex justify-center mb-4 pl-6 pr-2 rounded-xl  py-2 bg-[#9f21e3] ">
        <span className="text-2xl text-white font-semibold">
          Financial Trends
        </span>
      </div>
      <div className="flex flex-col flex-grow ">
        <>
          <div className="flex  justify-end">
            <div className="flex space-x-3 px-2 mr-8">
              <button
                onClick={() => yearClick(-1)}
                className="flex items-center justify-center"
              >
                <i className="fi fi-ss-angle-circle-left text-xl flex items-center justify-center"></i>
              </button>
              <span className="rounded-lg text-lg font-semibold p-1 px-3 bg-[#9f21e3] text-white">
                {year}
              </span>
              <button
                onClick={() => yearClick(1)}
                className="flex items-center justify-center"
              >
                <i className="fi fi-ss-angle-circle-right text-xl flex items-center justify-center"></i>
              </button>
            </div>
          </div>
          {fetching != null ? (
            <p className="flex justify-center mt-16 ">{fetching}</p>
          ) : (
            <>
              {transactions != null ? (
                <div className="flex justify-center">
                  <LineChart
                    width={1000}
                    height={500}
                    data={transactions}
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid stroke="#a8a29e" strokeDasharray="3 3" />
                    <XAxis strokeWidth={2} dataKey="name" />
                    <YAxis
                      tickFormatter={formatTick}
                      strokeWidth={2}
                      tickCount={8}
                      tick={{ dx: -10 }}
                    />
                    <Tooltip
                      formatter={(name, value, props) =>
                        toolTipFormat(name, value, props)
                      }
                    />
                    <Legend
                      margin={{ top: 100, left: 0, right: 0, bottom: 0 }}
                      iconType="circle"
                    />
                    <Line
                      type="monotone"
                      dataKey="Outgoing"
                      strokeWidth={2}
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="Incoming"
                      strokeWidth={2}
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </div>
              ) : (
                <p className="flex justify-center mt-16">Loading....</p>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
