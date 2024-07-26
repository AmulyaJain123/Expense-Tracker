export default function AddingTransactions() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Add Transaction Details</div>
        <div className="w-2/3 flex flex-col space-y-2">
          <p>
            <span className="font-semibold mr-4">Transaction Name</span>
            <span>Enter Transaction Name (25-30 characters).</span>
          </p>
          <p>
            <span className="font-semibold mr-4">To</span>
            <span>
              Specify the recipient for outgoing transactions or set to "Me" for
              incoming transactions.
            </span>
          </p>
          <p>
            <span className="font-semibold mr-4">From</span>
            <span>
              Specify the sender for incoming transactions or set to "Me" for
              outgoing transactions.
            </span>
          </p>
          <p>
            <span className="font-semibold mr-4">Transaction Amount</span>
            <span>Input the Amount in Rupees.</span>
          </p>
          <p>
            <span className="font-semibold mr-4">Category</span>
            <span>
              Select a Category from predefined options (e.g., Housing, Salary &
              Wage).
            </span>
          </p>
          <p>
            <span className="font-semibold mr-4">Date and Time</span>
            <span>
              Choose the Date and Time of the Transaction. Note that future
              dates are not allowed.
            </span>
          </p>
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Save Transaction </div>
        <div className="w-2/3">
          After entering all required details, click on the "Save" button to add
          the transaction to your expense tracker.
        </div>
      </div>
    </div>
  );
}
