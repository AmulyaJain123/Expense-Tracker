import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  orderBy,
  startAt,
  endAt,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { redirect } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAosIo6XD1RLsToLqWZp1_n-tvWZiwwSFc",
  authDomain: "expense-tracker-e96ac.firebaseapp.com",
  projectId: "expense-tracker-e96ac",
  storageBucket: "expense-tracker-e96ac.appspot.com",
  messagingSenderId: "420372493793",
  appId: "1:420372493793:web:b486fdf71ad899b7c7cea0",
  measurementId: "G-M7EG7G4P9S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();
const storage = getStorage();

const FirebaseContext = createContext({
  getRangeOfSplits: () => {},
  addSplit: () => {},
  deleteSplit: () => {},
  addBill: () => {},
  deleteBill: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export async function billViewLoader({ request }) {
  const url = new URL(request.url);
  let billId = url.searchParams.get("billId");

  const collRef = collection(firestore, "vaultBills");
  const q = query(collRef, where("billId", "==", billId));
  const documents = await getDocs(q);
  console.log(documents);
  if (documents.metadata.fromCache) {
    throw new Response(JSON.stringify({ message: "Could Not Reach Server" }), {
      status: 500,
    });
  }
  if (documents.empty) {
    throw new Response(JSON.stringify({ message: "Bill Not Found" }), {
      status: 500,
    });
  }
  const bill = documents.docs[0].data();
  console.log(bill);
  bill.billDate = bill.billDate.toDate();
  bill.createdOn = bill.createdOn.toDate();
  if (bill.expiryDate != null) {
    bill.expiryDate = bill.expiryDate.toDate();
  }

  const path = `billVault/${billId}/`;
  console.log(path);
  const folderRef = ref(storage, path);
  const res = await listAll(folderRef);
  console.log(res);
  let images = [];
  for (let i of res.items) {
    const url = await getDownloadURL(i);
    images.push(url);
  }
  console.log(images);
  return { bill: bill, images: images };
}

export async function vaultViewLoader({ request, params }) {
  const url = new URL(request.url);
  if (url.href === "http://localhost:5173/vault/view") {
    return redirect("/vault/view?sortBy=createdOn");
  }
  let sortField = url.searchParams.get("sortBy");
  if (
    sortField != "createdOn" &&
    sortField != "expiryDate" &&
    sortField != "billDate"
  ) {
    throw new Response(JSON.stringify({ message: "Bad Request" }), {
      status: 404,
    });
  }
  const collRef = collection(firestore, "vaultBills");
  const q = query(collRef, orderBy(sortField, "desc"));
  const res = await getDocs(q);
  console.log(res);
  if (res.metadata.fromCache) {
    throw new Response(JSON.stringify({ message: "Could Not Fetch Events" }), {
      status: 500,
    });
  }
  return res;
}

export default function FirebaseProvider({ children }) {
  async function getRangeOfSplits(startDoc, count) {
    try {
      const collRef = collection(firestore, "splits");
      let q = null;
      if (startDoc === null) {
        q = query(collRef, orderBy("createdAt", "desc"), limit(count));
      } else {
        q = query(
          collRef,
          orderBy("createdAt", "desc"),
          startAfter(startDoc),
          limit(count)
        );
      }
      let res = await getDocs(q);
      // console.log(res);
      if (res.metadata.fromCache === false && res.empty) {
        return { res: null, lastDoc: null, nextExists: false };
      }
      const lastDoc = res.docs[res.docs.length - 1];
      const newres = await getDocs(
        query(
          collRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(1)
        )
      );
      // console.log("newres", newres);
      const nextExists = !newres.empty;
      return { res, lastDoc, nextExists };
    } catch (err) {
      console.log(err);
      const res = new Response(
        JSON.stringify({ message: "Could not fetch data." }),
        {
          status: 500,
        }
      );
      return res;
    }
  }

  async function addSplit(data) {
    try {
      const collRef = collection(firestore, "splits");
      const res = await addDoc(collRef, data);
      return new Response(
        JSON.stringify({ message: "Data Appended Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Append Data." }),
        { status: 403 }
      );
    }
  }

  async function deleteSplit(id) {
    try {
      console.log(id);
      const res = await deleteDoc(doc(firestore, "splits", id));
      return new Response(
        JSON.stringify({ message: "Data Deleted Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Delete Data." }),
        { status: 403 }
      );
    }
  }

  async function addBill(data) {
    try {
      console.log(data);
      const collRef = collection(firestore, "vaultBills");
      const billDate = data.billDate;
      const billId = v4();
      const billDesc = data.billDesc;
      const billName = data.billName;
      const billTotal = data.billTotal;
      const createdOn = data.createdOn;
      let enteredExpireDate = null;
      if (data.expireDate != null) {
        enteredExpireDate = new Date(data.expireDate);
      }
      const enteredExpireDuration = data.expireDuration;
      const warrantyAdded = data.warrantyAdded;
      const expiryDate = data.expiryDate;
      const images = [];
      for (let i of data.fileObjects) {
        let nameOfImage = v4() + i.name;
        const imageRef = ref(storage, `billVault/${billId}/${nameOfImage}`);
        console.log("ewwef");
        const result = uploadBytesResumable(imageRef, i);
        console.log("wewrwerrfrfefef");
        const timer = setTimeout(() => {
          console.log("wefwef");
          result.cancel();
        }, 20000);
        await result;
        clearTimeout(timer);
        images.push(nameOfImage);
      }
      const obj = {
        billDate,
        billDesc,
        billId,
        billName,
        billTotal,
        createdOn,
        enteredExpireDate,
        enteredExpireDuration,
        warrantyAdded,
        expiryDate,
        images,
      };
      console.log(obj);
      const result = await addDoc(collRef, obj);
      return new Response(
        JSON.stringify({ message: "Data Appended Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Append Data." }),
        { status: 403 }
      );
    }
  }

  async function deleteBill(id) {
    try {
      console.log(id);
      const collRef = collection(firestore, "vaultBills");
      const q = query(collRef, where("billId", "==", id));
      const document = await getDocs(q);
      const docId = document.docs[0].id;
      for (let i of document.docs[0].data().images) {
        const url = i;
        const reference = ref(storage, `billVault/${id}/${url}`);
        const res = await deleteObject(reference);
      }
      const res = await deleteDoc(doc(firestore, "vaultBills", docId));
      return new Response(
        JSON.stringify({ message: "Data Deleted Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Delete Data." }),
        { status: 403 }
      );
    }
  }

  const initialContext = {
    getRangeOfSplits,
    addSplit,
    deleteSplit,
    addBill,
    deleteBill,
  };

  return (
    <FirebaseContext.Provider value={initialContext}>
      {children}
    </FirebaseContext.Provider>
  );
}
