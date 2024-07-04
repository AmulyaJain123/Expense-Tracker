import { Button } from "../../UIComponents/NextButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { splitCreateActions } from "../../store/main";
import { formatVal } from "../../util/algo";
import { useFirebase } from "../../store/firebase-context";
import { useState } from "react";

export default function SaveToDB({ res }) {
  const firebase = useFirebase();
  const splitInfo = useSelector((state) => state.splitCreate.splitInfo);
  const friends = useSelector((state) => state.splitCreate.friends);
  const storedBills = useSelector((state) => state.splitCreate.bills);
  const bgpattern = useSelector((state) => state.splitCreate.bgPattern);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const time = new Date();
    const registeredFriends = friends.map((friend) => friend.name);
    // console.log(registeredFriends);
    // console.log(res);
    const transactionToLiquidate = res.ans.map((obj) => {
      return {
        sender: obj.start,
        reciever: obj.end,
        amt: formatVal(obj.amount),
      };
    });
    // console.log(transactionToLiquidate);
    const expenditure = res.expenditure.map((obj) => {
      return {
        name: obj.name,
        amt: formatVal(obj.amount),
      };
    });
    // console.log(expenditure);
    // console.log(storedBills);
    const bills = storedBills.map((bill) => {
      const date = new Date(bill.billDate);
      const finalDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const newShares = bill.shares.map((share) => {
        return {
          name: share.name,
          amt: formatVal(share.share),
        };
      });

      return {
        billName: bill.billName,
        billDate: finalDate,
        billDesc: bill.description,
        billId: bill.id,
        payedBy: bill.payedBy,
        totalAmount: formatVal(bill.totalAmt),
        shares: newShares,
      };
    });
    // console.log(bills);
    const bgPattern = bgpattern;

    const obj = {
      createdAt: time,
      splitInfo: {
        splitName: splitInfo.splitName,
        splitDate: splitInfo.splitDate,
        splitDesc: splitInfo.description,
      },
      registeredFriends,
      transactionToLiquidate,
      expenditure,
      bills,
      bgPattern,
    };
    const reply = await firebase.addSplit(obj);
    setSaving(false);
    // console.log(reply);
    if (reply.status === 200) {
      dispatch(splitCreateActions.clearAll());
      alert("Split Saved Successfully!!");
      navigate("/split");
    } else {
      alert("ERROR: Save Unsuccessfull :(");
    }
  }
  return (
    <>
      {saving ? (
        <p className="p-3 text-lg font-medium mt-[50px]">Saving...</p>
      ) : (
        <Button onClick={save}>Save</Button>
      )}
    </>
  );
}
