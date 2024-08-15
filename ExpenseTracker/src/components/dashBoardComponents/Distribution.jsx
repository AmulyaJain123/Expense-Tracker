import { useFirebase } from "../../store/firebase-context";
import { useState, useEffect } from "react";
import more from "../../assets/open-book.gif";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getData } from "../../util/distribution";
import numeral from "numeral";
import {
  incomingTransactionCategories,
  outgoingTransactionCategories,
} from "../../util/componentNavigation";
import { useSelector } from "react-redux";

const colorPal = [
  "#fd7f6f",
  "#7eb0d5",
  "#b2e061",
  "#bd7ebe",
  "#ffb55a",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
];

export default function Distribution() {
  const [activeSector, setActiveSector] = useState(null);
  const [stage, setStage] = useState(null);
  const data = useSelector((state) => state.dashboard.data);
  const [transactions, setTransactions] = useState(null);
  // console.log(data);

  useEffect(() => {
    if (data != null) {
      const result = getData(JSON.parse(JSON.stringify(data)));
      setTransactions(JSON.parse(JSON.stringify(result)));
      setStage(null);
    }
  }, [data]);

  function sectorHover(event, index) {
    const percent = numeral(event.percent).format("0.00%");
    const name = event.name;
    setActiveSector({ index, percent, name });
  }

  function sectorClick(event, index) {
    // console.log("click", event, index);
    setStage({ level: 1, ind: index });
    setActiveSector(null);
  }
  function sectorClick2(event, index) {
    setStage((preval) => ({ level: 2, ind1: preval.ind, ind2: index }));
    setActiveSector(null);
  }

  function goBack(level) {
    if (level == 1) {
      setStage(null);
    } else {
      setStage((preval) => ({ level: 1, ind: preval.ind1 }));
    }
  }

  function legendHover(event, index) {
    // console.log("legend", event, index);

    const percent = numeral(event.payload.percent).format("0.00%");
    const name = event.payload.name;
    setActiveSector({ index, percent, name });
  }

  return (
    <section className="flex relative flex-grow flex-col rounded-xl bg-[#f7ebfd] p-4">
      <Link
        to={"/track/distributions"}
        className="absolute rounded-lg bg-[#fffdf7] border-2 border-stone-700 text-[black] font-medium shadow-xl text-md bottom-[40px] z-20  right-[50px]"
      >
        <div className="flex space-x-1 px-2 items-center">
          <img src={more} className="w-[50px]" alt="" />
        </div>
      </Link>
      <header className="rounded-xl text-white pl-4 text-2xl font-semibold flex justify-center p-2 bg-[#9f21e3]">
        <span>Expense Distribution</span>
      </header>
      {transactions != null ? (
        <>
          {transactions.length != 0 ? (
            <div className="flex relative justify-center items-center flex-grow mt-4">
              <div className="absolute top-[52%] right-[50%] translate-x-[50%] -translate-y-[50%]">
                {activeSector === null ? (
                  ""
                ) : (
                  <div className="flex flex-grow items-center flex-col">
                    <p className="text-base flex-grow flex  font-medium mb-2">
                      {activeSector.name}
                    </p>
                    <span className="text-base pl-2 flex-grow flex  font-semibold">
                      {activeSector.percent}
                    </span>
                  </div>
                )}
              </div>
              {stage != null && stage.level === 1 ? (
                <div className="flex absolute bottom-[-5px] right-[50%] translate-x-[50%]">
                  {stage.ind === 0 ? "Outgoing" : "Incoming"}
                </div>
              ) : null}
              {stage != null && stage.level === 2 ? (
                <div className="flex absolute bottom-[-5px] right-[50%] translate-x-[50%]">
                  <span className="mr-2">
                    {stage.ind1 === 0 ? "Outgoing" : "Incoming"}
                  </span>
                  <span className="mr-2 flex items-center">
                    <i className="fi fi-ss-angle-small-right flex justify-center items-center"></i>
                  </span>
                  <span>
                    {stage.ind1 === 0
                      ? outgoingTransactionCategories[stage.ind2].name
                      : incomingTransactionCategories[stage.ind2].name}
                  </span>
                </div>
              ) : null}
              {stage != null && stage.level === 1 ? (
                <button
                  onClick={() => goBack(1)}
                  className="flex rounded-full z-20 justify-center items-center text-3xl text-black absolute left-[20px] top-[50%] -translate-y-[50%]"
                >
                  <i className="fi fi-ss-angle-circle-left flex justify-center items-center"></i>
                </button>
              ) : null}
              {stage != null && stage.level === 2 ? (
                <button
                  onClick={() => goBack(2)}
                  className="flex rounded-full z-20 justify-center items-center text-3xl text-black absolute left-[20px] top-[50%] -translate-y-[50%]"
                >
                  <i className="fi fi-ss-angle-circle-left flex justify-center items-center"></i>
                </button>
              ) : null}

              {stage === null ? (
                <PieChart width={600} height={500} className="">
                  <Legend
                    align="center"
                    verticalAlign="top"
                    iconType="circle"
                    onMouseEnter={(event, index) => legendHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    onClick={(event, index) => sectorClick(event, index)}
                  ></Legend>
                  <Tooltip filterNull wrapperClassName="hidden" />
                  <Pie
                    data={transactions}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    minAngle={2}
                    isAnimationActive={false}
                    className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                    outerRadius={150}
                    innerRadius={90}
                    label={<CustomLabel />}
                    onMouseEnter={(event, index) => sectorHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    onClick={(event, index) => sectorClick(event, index)}
                    labelLine={false}
                  >
                    {transactions.map((entry, index) => {
                      return (
                        <Cell
                          stroke="#000"
                          strokeWidth={1}
                          outerRadius={index % 2 === 0 ? 150 : 200}
                          key={`cell-${index}`}
                          fill={colorPal[index]}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              ) : null}
              {stage != null && stage.level === 1 ? (
                <PieChart width={600} height={500} className="">
                  <Legend
                    align="center"
                    verticalAlign="top"
                    iconType="circle"
                    onMouseEnter={(event, index) => legendHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    onClick={(event, index) => sectorClick2(event, index)}
                  ></Legend>
                  <Tooltip wrapperClassName="hidden" />
                  <Pie
                    data={transactions[stage.ind].subFields}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    minAngle={2}
                    className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                    outerRadius={150}
                    innerRadius={90}
                    isAnimationActive={false}
                    label={<CustomLabel />}
                    onMouseEnter={(event, index) => sectorHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    onClick={(event, index) => sectorClick2(event, index)}
                    labelLine={false}
                  >
                    {transactions[stage.ind].subFields.map((entry, index) => {
                      return (
                        <Cell
                          stroke="#000"
                          strokeWidth={1}
                          outerRadius={index % 2 === 0 ? 150 : 200}
                          key={`cell-${index}`}
                          fill={colorPal[index]}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              ) : null}
              {stage != null && stage.level === 2 ? (
                <PieChart width={600} height={500} className="">
                  <Legend
                    align="center"
                    verticalAlign="top"
                    iconType="circle"
                    onMouseEnter={(event, index) => legendHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                  ></Legend>
                  <Tooltip wrapperClassName="hidden" />
                  <Pie
                    data={
                      transactions[stage.ind1].subFields[stage.ind2].subFields
                    }
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    minAngle={2}
                    isAnimationActive={false}
                    className="cursor-pointer focus:outline-none active:outline-none active:border-none focus:border-none"
                    outerRadius={150}
                    innerRadius={90}
                    label={<CustomLabel />}
                    onMouseEnter={(event, index) => sectorHover(event, index)}
                    onMouseLeave={() => setActiveSector(null)}
                    labelLine={false}
                  >
                    {transactions[stage.ind1].subFields[
                      stage.ind2
                    ].subFields.map((entry, index) => {
                      return (
                        <Cell
                          stroke="#000"
                          strokeWidth={1}
                          outerRadius={index % 2 === 0 ? 150 : 200}
                          key={`cell-${index}`}
                          fill={colorPal[index]}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              ) : null}
            </div>
          ) : (
            <p className="flex py-16 items-center text-base font-normal text-stone-500 justify-center">
              No Data to Process
            </p>
          )}
        </>
      ) : (
        <p className="flex py-16 items-center text-base font-normal text-stone-500 justify-center">
          Loading....
        </p>
      )}
    </section>
  );
}

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2; // Increase the radius to place the label outside the pie chart
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const textAnchor = x > cx ? "start" : "end";
  const dominantBaseline = "middle";

  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        className="font-semibold"
        style={{ fill: "black" }} // Equivalent to Tailwind's text-sm and text-white
      >
        {`${numeral(value).format("0,0.00")} ₹`}
      </text>
    </g>
  );
};
