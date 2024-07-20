import TransactionRows from "../dashBoardComponents/TransactionRows";

export default function DataDisplay({ data }) {
  return (
    <>
      <header className="flex border-b-[2px] border-stone-500 pb-2 mr-4 space-x-8 text-md font-semibold text-stone-500 pl-2 p-1 px-4">
        <span className="flex-[0.18]   min-w-[200px]">Name</span>
        <span className="flex-[0.14]   ">From</span>
        <span className="flex-[0.12]   ">Amount</span>
        <span className=" flex-[0.14]  ">To</span>
        <span className=" flex-[0.17]  ">Date</span>
        <span className="flex-[0.15]   ">Category</span>
        <span className="flex-[0.1]  ">Type</span>
      </header>
      <div className="flex flex-col pt-4 space-y-3 h-[700px] overflow-auto customScroll pr-2">
        {data.map((i) => {
          return <TransactionRows key={Math.random()} data={i} />;
        })}
      </div>
    </>
  );
}
