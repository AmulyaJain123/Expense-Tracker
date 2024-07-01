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
  getDocumentWithId: () => {},
  getAllSplits: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider({ children }) {
  function getDocumentWithId(id) {
    const docRef = doc(firestore, "splits", id);
    return getDoc(docRef);
  }
  async function getAllSplits() {
    const collRef = collection(firestore, "splits");
    const res = await getDocs(collRef);
    return res;
  }

  const initialContext = {
    getDocumentWithId,
    getAllSplits,
  };

  return (
    <FirebaseContext.Provider value={initialContext}>
      {children}
    </FirebaseContext.Provider>
  );
}
