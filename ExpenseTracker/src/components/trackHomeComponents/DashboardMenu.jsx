export default function DashboardMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Overview </div>
        <div className="w-2/3">
          Get a Snapshot of key information from the Transaction page and
          Distribution page.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Financial Summary </div>
        <div className="w-2/3">
          View a summary of your Financial Activities, including Totals for
          Incoming and Outgoing transactions.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Recent Transactions</div>
        <div className="w-2/3">
          Quickly glance at your most recent Transactions.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Expense Distribution</div>
        <div className="w-2/3">
          See a Brief Overview of your Expense Distribution across Categories.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">
          Financial Trend Analysis
        </div>
        <div className="w-2/3">
          Analyze the Trend of your Outgoing and Incoming Expenses over the
          months in a year, helping you understand your Financial Patterns.
        </div>
      </div>
    </div>
  );
}
