import { Link } from "react-router-dom";
import folderIcon from "../../assets/folder.png";
import billPage from "../../assets/billPage-icon.png";
import warrantyIcon from "../../assets/warranty-icon.png";
import expiredIcon from "../../assets/expired-icon.png";

export default function BillIcon({ data }) {
  const obj = data.data();
  // console.log(obj, obj.billDate);
  const date = obj.billDate.toDate();
  // console.log(date);
  const billDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  // console.log(billDate);

  function warrantyStatus() {
    if (obj.expiryDate === null) {
      return null;
    }
    let currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    let expiry = obj.expiryDate.toDate();
    expiry.setHours(0, 0, 0, 0);
    if (obj.warrantyAdded && expiry > currDate) {
      return true;
    } else if (obj.warrantyAdded) {
      return false;
    }
    return null;
  }

  const stat = warrantyStatus();
  // console.log("stat", stat);

  return (
    <Link
      className="relative w-fit h-fit group flex flex-col p-3"
      to={`bill?billId=${obj.billId}`}
    >
      <img
        className="rotate-[-90deg] w-[80px] absolute top-[20px] duration-700 left-[24px] group-hover:rotate-[-45deg] group-hover:top-[-10px] "
        src={billPage}
        alt=""
      />
      <img
        className="rotate-[-90deg] w-[80px] z-10 absolute top-[20px] duration-700 left-[20px] group-hover:rotate-[-60deg] group-hover:top-[-5px] "
        src={billPage}
        alt=""
      />
      {stat === true ? (
        <>
          <img
            className="w-[35px] absolute right-[5px] top-[15px] z-40 h-[35px]"
            src={warrantyIcon}
            alt=""
          />
        </>
      ) : null}
      {stat === false ? (
        <>
          <img
            className="w-[35px] absolute right-[5px] top-[15px] z-40 h-[35px]"
            src={expiredIcon}
            alt=""
          />
        </>
      ) : null}
      <img className="w-[100px] h-[100px] z-30" src={folderIcon} alt="" />
      <div className="w-[100px] z-30 mt-1 font-semibold text-xs text-center flex flex-col items-center justify-center">
        <span>{obj.billName}</span>
        <span className="mt-1">{billDate}</span>
      </div>
    </Link>
  );
}
