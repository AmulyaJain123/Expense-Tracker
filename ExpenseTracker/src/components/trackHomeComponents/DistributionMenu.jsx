import styles from "./DistributionMenu.module.css";

export default function DistributionMenu() {
  return (
    <div className={`${styles.main}`}>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px]">
        <div className="font-medium text-lg md:w-1/3">
          Expense Distribution{" "}
        </div>
        <div className="md:w-2/3">
          Visual representation of Expenses across different Categories for a
          Selected Time Interval.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px]">
        <div className="font-medium text-lg md:w-1/3">Category Breakdown </div>
        <div className="md:w-2/3">
          See how much has been spent or received in each Category.
        </div>
      </div>
      <div className="flex bg-stone-100 py-4 px-2 border-b-2 border-stone-300 md:space-x-[50px]">
        <div className="font-medium text-lg md:w-1/3">
          Time Interval Selection
        </div>
        <div className="md:w-2/3">
          Choose the desired Time Period to view the Distribution of Expenses.
        </div>
      </div>
    </div>
  );
}
