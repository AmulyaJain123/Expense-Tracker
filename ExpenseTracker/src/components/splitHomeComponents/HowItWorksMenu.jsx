/*Create a Split: Start by creating a split and adding the participants.
Add Bills: Enter the details of each bill that needs to be divided. You
can add multiple bills, and each can have a different composition of
expenses shared among the participants. Simplify Transactions: BillSplit
will automatically calculate and minimize the number of transactions
needed to settle the split, making it easy for everyone to pay their fair
share */

export default function HowItWorksMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Create a Split </div>
        <div className="w-2/3">
          Start by creating a split and adding the participants.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Add Bills </div>
        <div className="w-2/3">
          Enter the details of each bill that needs to be divided. You can add
          multiple bills, and each can have a different composition of expenses
          shared among the participants.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 space-x-[50px] mx-[100px]">
        <div className="font-medium text-lg w-1/3">Simplify Transactions</div>
        <div className="w-2/3">
          BillSplit will automatically calculate and minimize the number of
          transactions needed to settle the split, making it easy for everyone
          to pay their fair share.
        </div>
      </div>
    </div>
  );
}
