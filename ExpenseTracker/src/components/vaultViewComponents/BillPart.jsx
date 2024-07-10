import { formatDate } from "../../util/algo";

export default function BillPart({ data }) {
  function dateDiff() {
    let today = new Date();
    let diff = Math.ceil((data.expiryDate - today) / (36e5 * 24));
    console.log(diff);
    if (diff === 1) {
      return "Expiring Today";
    }
    let years = 0;
    let months = 0;
    let days = 0;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];
    while (diff != 0) {
      console.log(today, diff);
      const todayY = today.getFullYear();
      const todayM = today.getMonth() + 1;
      const todayD = today.getDate();
      let year = 365;
      let month = 30;
      daysInMonths[1] = 28;
      if (
        (((todayY % 100 != 0 && todayY % 4 === 0) || todayY % 400 === 0) &&
          (today.getMonth() + 1 < 3 ||
            (today.getMonth() + 1 === 2 && today.getDate() < 29))) ||
        ((((todayY + 1) % 100 != 0 && (todayY + 1) % 4 === 0) ||
          (todayY + 1) % 400 === 0) &&
          today.getMonth() + 1 > 2)
      ) {
        year = 366;
      }
      if ((todayY % 100 != 0 && todayY % 4 === 0) || todayY % 400 === 0) {
        daysInMonths[1] = 29;
      }
      month = daysInMonths[todayM - 1];
      if (diff >= year) {
        ++years;
        diff -= year;
        const res = today.setDate(today.getDate() + year);
        today = new Date(res);
      } else if (diff >= month) {
        ++months;
        diff -= month;
        const res = today.setDate(today.getDate() + month);
        today = new Date(res);
      } else {
        days = diff;
        diff -= days;
        const res = today.setDate(today.getDate() + days);
        today = new Date(res);
      }
    }
    const str = `${
      years != 0 ? `${years} ${years > 1 ? "Years " : "Year "}` : ""
    }${months != 0 ? `${months} ${months > 1 ? "Months " : "Month "}` : ""}${
      days != 0 ? `${days} ${days > 1 ? "Days " : "Day "}` : ""
    }Remaining`;

    return str;
  }

  let currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  console.log(currDate);

  return (
    <div className="bg-white zigzag w-[358px] pb-[100px]">
      <div className="bg-slate-100 m-4 rounded-lg flex text-black justify-center items-center h-[60px] text-2xl uppercase font-bold">
        Bill
      </div>

      <div className="flex h-[20px]">
        <div className="billCuts-stone h-[20px] w-[20px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
          <div className="h-1/2 w-full  border-stone-300"></div>
        </div>
        <div className="billCuts-stone h-[20px] w-[20px] rounded-l-full"></div>
      </div>

      <div className="flex flex-col space-y-[40px] mt-[60px]">
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Name
          </div>
          <div className="flex p-2 px-4 justify-center text-stone-500 rounded-md text-lg mx-4 mt-2 bg-slate-100">
            {data.billName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Created On
          </div>
          <div className="flex p-2 px-4 justify-center text-stone-500 rounded-md text-lg mx-4 mt-2 bg-slate-100">
            {formatDate(data.createdOn)}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Date
          </div>
          <div className="p-2 px-4 text-lg text-center text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {formatDate(data.billDate)}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-semibold flex justify-center">
            Bill Total
          </div>
          <div className="p-2 px-4 text-center text-lg text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
            {data.billTotal}
          </div>
        </div>
        <div className="flex flex-col mb-[30px]">
          <div className="text-xl font-semibold flex justify-center">
            Description
          </div>
          <div className="p-2 px-4 text-center resize-none text-stone-500 rounded-md h-[150px] text-lg mx-4 mt-2 bg-slate-100">
            {data.billDesc}
          </div>
        </div>
        {data.warrantyAdded ? (
          <div className="flex flex-col">
            <div className="text-xl font-semibold flex justify-center">
              Expiration Date
            </div>
            <div className="p-2 px-4 text-lg text-center text-stone-500 rounded-md mx-4 mt-2 bg-slate-100">
              {formatDate(data.expiryDate)}
            </div>
          </div>
        ) : null}
        {data.warrantyAdded ? (
          <div className="flex flex-col">
            <div className="text-xl font-semibold flex justify-center">
              Expiration Status
            </div>
            {data.expiryDate > currDate ? (
              <div className="p-2 px-4 text-lg text-center text-green-600 rounded-md mx-4 mt-2 bg-green-200">
                {dateDiff()}
              </div>
            ) : (
              <div className="p-2 px-4 text-lg text-center rounded-md font-semibold text-red-600 mx-4 mt-2 bg-red-200">
                Expired
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
