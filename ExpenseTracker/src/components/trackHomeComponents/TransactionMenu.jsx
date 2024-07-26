export default function TransactionMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">View All Transactions </div>
        <div className="w-2/3">
          Access a Comprehensive list of all your Transactions
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Filter Transactions </div>
        <div className="w-2/3">
          Apply Filters based on Date, Name, Type (Incoming or Outgoing),
          Amount, etc, To narrow down the Transactions displayed.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Sort Transactions</div>
        <div className="w-2/3">
          Sort Transactions in Ascending or Descending order by Date, Name,
          Type, Amount, etc., for easier Analysis.
        </div>
      </div>
    </div>
  );
}
