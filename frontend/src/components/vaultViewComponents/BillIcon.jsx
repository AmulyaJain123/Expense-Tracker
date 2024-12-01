import { Link } from "react-router-dom";
import folderIcon from "../../assets/folder.png";
import billPage from "../../assets/billPage-icon.png";
import warrantyIcon from "../../assets/warranty-icon.png";
import expiredIcon from "../../assets/expired-icon.png";
import styles from "./BillIcon.module.css";

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
    <Link className={`${styles.dad}`} to={`bill?billId=${obj.billId}`}>
      <img className={`${styles.bill}`} src={billPage} alt="" />
      <img className={`${styles.bill2}`} src={billPage} alt="" />
      {stat === true ? (
        <>
          <img
            className="w-[30px] h-[30px] sm:w-[35px] absolute right-[5px] top-[15px] z-40 sm:h-[35px]"
            src={warrantyIcon}
            alt=""
          />
        </>
      ) : null}
      {stat === false ? (
        <>
          <img
            className="w-[30px] h-[30px] sm:w-[35px] absolute right-[5px] top-[15px] z-40 sm:h-[35px]"
            src={expiredIcon}
            alt=""
          />
        </>
      ) : null}
      <img
        className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] z-30"
        src={folderIcon}
        alt=""
      />
      <div className="w-[70px] sm:w-[100px] z-30 mt-1 font-semibold  sm:text-xs text-center flex flex-col items-center justify-center">
        <span>{obj.billName}</span>
        <span className="mt-1">{billDate}</span>
      </div>
    </Link>
  );
}
