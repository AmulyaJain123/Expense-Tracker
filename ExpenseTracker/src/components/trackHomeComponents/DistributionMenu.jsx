export default function DistributionMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Expense Distribution </div>
        <div className="w-2/3">
          Visual representation of Expenses across different Categories for a
          Selected Time Interval.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Category Breakdown </div>
        <div className="w-2/3">
          See how much has been spent or received in each Category.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Time Interval Selection</div>
        <div className="w-2/3">
          Choose the desired Time Period to view the Distribution of Expenses.
        </div>
      </div>
    </div>
  );
}
