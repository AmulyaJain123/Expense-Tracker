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

const FirebaseContext = createContext({
  getRangeOfSplits: () => {},
  addSplit: () => {},
  deleteSplit: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

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

  const initialContext = {
    getRangeOfSplits,
    addSplit,
    deleteSplit,
  };

  return (
    <FirebaseContext.Provider value={initialContext}>
      {children}
    </FirebaseContext.Provider>
  );
}
