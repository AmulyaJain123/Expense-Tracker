import { Link } from "react-router-dom";
import Transactions from "../components/dashBoardComponents/Transactions";
import WidgetSquare from "../components/dashBoardComponents/WidgetSquare";
import Distribution from "../components/dashBoardComponents/Distribution";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardActions } from "../store/main";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Trend from "../components/dashBoardComponents/Trend";
import responsive from "../assets/responsive-website.png";
import prohibition from "../assets/prohibition.png";

export default function DashBoard() {
  const loadedData = useLoaderData();
  const [count, setCount] = useState("2");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  function selectChange(event) {
    setCount(event.target.value);
  }
  // console.log(loadedData);
  useEffect(() => {
    if (count === "1" || count === "7" || count === "30") {
      const ans = [];
      const duration = parseInt(count);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayd = today.getDate();
      const todaym = today.getMonth() + 1;
      const todayy = today.getFullYear();
      for (let i of loadedData) {
        const date = i.dateTime.toDate();
        date.setHours(0, 0, 0, 0);
        const diff = Math.round((today - date) / 864e5);
        if (
          duration === 1 &&
          date.getFullYear() === todayy &&
          date.getMonth() + 1 === todaym &&
          date.getDate() === todayd
        ) {
          ans.push(i);
        } else if (duration === 7 && diff < 7) {
          ans.push(i);
        } else if (duration === 30 && diff < 30) {
          ans.push(i);
        } else {
          break;
        }
      }
      const arr = [];
      for (let i of ans) {
        let c = i.dateTime.toDate();
        c = c.toString();
        arr.push({ ...i, dateTime: c });
      }
      dispatch(dashboardActions.setData(arr));
    } else if (count === "2") {
      const ans = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayd = today.getDate();
      const todaym = today.getMonth() + 1;
      const todayy = today.getFullYear();
      const todayw = (today.getDay() + 6) % 7;
      const duration = todayw;
      for (let i of loadedData) {
        const date = i.dateTime.toDate();
        date.setHours(0, 0, 0, 0);
        const diff = Math.round((today - date) / 864e5);
        if (diff <= duration) {
          ans.push(i);
        }
      }
      const arr = [];
      for (let i of ans) {
        let c = i.dateTime.toDate();
        c = c.toString();
        arr.push({ ...i, dateTime: c });
      }
      dispatch(dashboardActions.setData(arr));
    } else {
      const ans = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayd = today.getDate();
      const todaym = today.getMonth() + 1;
      const todayy = today.getFullYear();
      const duration = todayd - 1;
      for (let i of loadedData) {
        const date = i.dateTime.toDate();
        date.setHours(0, 0, 0, 0);
        const diff = Math.round((today - date) / 864e5);
        if (diff <= duration) {
          ans.push(i);
        }
      }
      const arr = [];
      for (let i of ans) {
        let c = i.dateTime.toDate();
        c = c.toString();
        arr.push({ ...i, dateTime: c });
      }
      dispatch(dashboardActions.setData(arr));
    }
  }, [count]);
  // console.log(data);

  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px]  text-stone-700 rounded-l-xl">
      <div className=" hidden 2xl:flex flex-col space-y-4">
        <div className="flex mx-4 relative mt-4 p-2 px-6 justify-center items-center uppercase text-[35px] font-bold rounded-xl bg-[#9f21e3] text-white">
          <span>Dashboard</span>
          <select
            value={count}
            onChange={(event) => selectChange(event)}
            className="bg-white absolute top-[50%] -translate-y-[50%] right-[15px] rounded-lg p-1 px-3 text-lg text-stone-500 font-normal"
            name=""
            id=""
          >
            <option value="1">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="2">This Week</option>
            <option value="3">This Month</option>
          </select>
        </div>
        <div className="flex space-x-4 mx-4 mt-4">
          <WidgetSquare />
          <Distribution />
        </div>
        <Trend />

        <Transactions />
      </div>

      <div className="flex flex-col mt-[200px] items-center 2xl:hidden">
        <div className="relative">
          <img className="w-[200px] opacity-75" src={responsive} alt="" />
          <img
            src={prohibition}
            className="absolute top-[50%] right-[50%] translate-x-[50%] opacity-85 translate-y-[-50%] w-[130px]"
            alt=""
          />
        </div>
        <p className="mx-auto px-16 mt-8 text-center text-sm sm:text-base">
          Please switch to a screen size bigger than 1500px
        </p>
      </div>
    </div>
  );
}
