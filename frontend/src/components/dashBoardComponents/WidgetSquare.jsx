import { useFirebase } from "../../store/firebase-context";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { formats } from "numeral";
import exit from "../../assets/backward.png";
import add from "../../assets/plus.png";
import { useSelector } from "react-redux";

export default function WidgetSquare() {
  const [val, setVal] = useState(null);
  const transactions = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    if (transactions != null) {
      let pos = 0;
      let neg = 0;
      let net = 0;
      // console.log(transactions);
      for (let i of transactions) {
        // console.log(i);
        if (i.transactionType === "Incoming") {
          pos += i.transactionAmount;
          net += i.transactionAmount;
        } else {
          neg += i.transactionAmount;
          net -= i.transactionAmount;
        }
      }
      setVal({ pos, neg, net });
    }
  }, [transactions]);

  return (
    <section className="flex w-[600px] h-[600px] aspect-square flex-col space-y-4">
      <div className="flex flex-col space-y-4 h-[220px] rounded-xl p-4 bg-[#f7ebfd]">
        <header className="flex p-2 px-4 pr-2 h-fit justify-center rounded-xl bg-[#9f21e3] text-white">
          <span className="text-2xl font-semibold ">Financial Summary</span>
        </header>
        {transactions === null || val === null ? (
          <p className="font-normal text-base flex text-stone-500 pt-12 items-center justify-center">
            Loading....
          </p>
        ) : (
          <div className="flex flex-grow text-stone-600 space-x-4 ">
            <div className="flex flex-col  items-center w-[32%] p-2 bg-purple-200   rounded-xl">
              <h2 className="text-lg w-full font-medium justify-center p-1 px-3 bg-[white] rounded-lg   mb-2 flex">
                Expenditure
              </h2>
              <div className="flex w-full justify-center flex-col bg-[white]   flex-grow rounded-lg items-center">
                <p className="flex rounded-md w-fit items-center justify-center  font-semibold text-base ">
                  {val === null
                    ? "Calculating..."
                    : numeral(val.neg).format("0,0.00") + " ₹"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-[32%] p-2 bg-purple-200   rounded-xl">
              <h2 className="text-lg w-full font-medium justify-center p-1 px-3 bg-[white] rounded-lg   mb-2 flex">
                Income
              </h2>
              <div className="flex w-full justify-center flex-col bg-[white]   flex-grow rounded-lg items-center">
                <p className="flex rounded-md w-fit items-center justify-center  font-semibold text-base ">
                  {val === null
                    ? "Calculating..."
                    : numeral(val.pos).format("0,0.00") + " ₹"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-[32%] p-2 bg-purple-200   rounded-xl">
              <h2 className="text-lg w-full font-medium justify-center p-1 px-3 bg-[white] rounded-lg   mb-2 flex">
                Net Revenue
              </h2>
              <div className="flex w-full justify-center flex-col bg-[white]   flex-grow rounded-lg items-center">
                <p className="flex rounded-md w-fit items-center justify-center font-semibold text-base ">
                  {val === null
                    ? "Calculating..."
                    : numeral(val.net).format("+0,0.00") + " ₹"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-grow space-x-4">
        <div className="h-full flex  min-w-[180px] flex-col space-y-4">
          <Link
            to={"/track"}
            className="rounded-2xl aspect-square border-[5px] group border-[#f7ebfd] hover:border-[#9f21e3] duration-500 flex-grow flex justify-center items-center bg-[#f7ebfd] flex-1 p-4"
          >
            <img
              src={exit}
              className="w-[100px] group-hover:scale-[130%] duration-500"
              alt=""
            />
          </Link>
          <Link
            to={"/track/create"}
            className="rounded-2xl aspect-square text-center border-[5px] group border-[#f7ebfd] hover:border-[#9f21e3] duration-500 flex-grow flex flex-col justify-center items-center bg-[#f7ebfd] text-[#9f21e3] text-lg font-semibold flex-1 p-4"
          >
            <img
              src={add}
              className="w-[100px] group-hover:scale-[130%] duration-500"
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col bg-[#f7ebfd] space-y-1 px-4 rounded-xl">
          <h2 className="font-semibold uppercase text-lg mb-1 rounded-lg bg-[#9f21e3] text-white tracking-wide text-center p-1 mt-2 ">
            Dashboard Overview
          </h2>
          <div className="flex flex-col px-2 ">
            <h3 className="font-medium text-center text-base">
              Financial Summary
            </h3>
            <p className="font-normal text-center text-xs">
              Gain a quick insight into your finances with a concise summary of
              your total expenditure, income, and net revenue for the last few
              days.
            </p>
          </div>
          <div className="flex flex-col px-2 ">
            <h3 className="font-medium text-center text-base">
              Transaction History
            </h3>
            <p className="font-normal text-center text-xs">
              Stay up-to-date with your latest financial activities. This
              section lists your most recent transactions, ensuring you can
              track and review your spending easily.
            </p>
          </div>
          <div className="flex flex-col px-2 ">
            <h3 className="font-medium text-center text-base">
              Expense Distribution
            </h3>
            <p className="font-normal text-center text-xs">
              Understand where your money goes by viewing a visual breakdown of
              your expenses across different categories with help of Pie-Charts.
            </p>
          </div>
          <div className="flex flex-col px-2 ">
            <h3 className="font-medium text-center text-base">
              Financial Trends
            </h3>
            <p className="font-normal text-center text-xs">
              Compare your current month's financial performance with the
              previous month. Analyze trends and changes in your income and
              expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
