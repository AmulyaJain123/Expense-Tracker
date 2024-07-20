import { formatVal } from "../../util/algo";

export default function TransactionRows({ data }) {
  const {
    category,
    dateTime,
    from,
    to,
    transactionAmount,
    transactionName,
    transactionType,
  } = data;

  function formatNum(num) {
    const n = parseInt(num);
    if (n < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  const date = `${formatNum(dateTime.toDate().getDate())}/${formatNum(
    dateTime.toDate().getMonth() + 1
  )}/${dateTime.toDate().getFullYear()}`;
  const time = `${formatNum(dateTime.toDate().getHours())}:${formatNum(
    dateTime.toDate().getMinutes()
  )}`;

  return (
    <div className="flex rounded-sm border-b-2 border-[#adb5bd] bg-[#f8f9fa] text-black space-x-8 p-1 py-2 px-4">
      <span className="flex-[0.18]  ">{transactionName}</span>
      <span className="flex-[0.14]   ">{from}</span>
      <span className="flex-[0.12]   ">{formatVal(transactionAmount)}</span>
      <span className=" flex-[0.14]  ">{to}</span>
      <span className=" flex-[0.17]  ">
        {date}&nbsp; &nbsp; {time}
      </span>
      <span className="flex-[0.15]  ">{category}</span>
      <span
        style={{
          color: transactionType === "Outgoing" ? "blue" : "#55a630",
        }}
        className="flex-[0.1] font-semibold "
      >
        {transactionType}
      </span>
    </div>
  );
}
