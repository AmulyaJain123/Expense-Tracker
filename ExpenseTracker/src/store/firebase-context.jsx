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
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();
const storage = getStorage();
const auth = getAuth();
setTimeout(() => {
  // console.log(auth.currentUser);
}, 2000);
// console.log("auth", auth, auth.currentUser);

const FirebaseContext = createContext({
  getRangeOfSplits: () => {},
  addSplit: () => {},
  deleteSplit: () => {},
  addBill: () => {},
  deleteBill: () => {},
  addTransaction: () => {},
  fetchAllTransactions: () => {},
  signUp: () => {},
  logOutCurrUser: () => {},
  signIn: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

export async function commonLoader({ request }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }
  return "";
}

export async function billViewLoader({ request }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }

  const url = new URL(request.url);
  let billId = url.searchParams.get("billId");

  const collRef = collection(firestore, `users/${user.uid}/vault`);
  const q = query(collRef, where("billId", "==", billId));
  const documents = await getDocs(q);
  // console.log(documents);
  if (documents.metadata.fromCache) {
    throw "401";
  }
  if (documents.empty) {
    throw "403";
  }
  const bill = documents.docs[0].data();
  // console.log(bill);
  bill.billDate = bill.billDate.toDate();
  bill.createdOn = bill.createdOn.toDate();
  if (bill.expiryDate != null) {
    bill.expiryDate = bill.expiryDate.toDate();
  }

  const path = `vault/${user.uid}/${billId}/`;
  // console.log(path);
  const folderRef = ref(storage, path);
  const res = await listAll(folderRef);
  // console.log(res);
  let images = [];
  for (let i of res.items) {
    const url = await getDownloadURL(i);
    images.push(url);
  }
  // console.log(images);
  return { bill: bill, images: images };
}

export async function vaultViewLoader({ request, params }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }
  const url = new URL(request.url);
  // console.log(url);
  if (url.pathname === "/vault/view" && url.search === "") {
    return redirect("/vault/view?sortBy=createdOn");
  }
  let sortField = url.searchParams.get("sortBy");
  if (
    sortField != "createdOn" &&
    sortField != "expiryDate" &&
    sortField != "billDate"
  ) {
    throw "403";
  }
  const collRef = collection(firestore, `users/${user.uid}/vault`);
  const q = query(collRef, orderBy(sortField, "desc"));
  const res = await getDocs(q);
  // console.log(res);
  if (res.metadata.fromCache) {
    throw "401";
  }
  return res;
}

export async function transactionsLoader({ request }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }

  const collRef = collection(firestore, `users/${user.uid}/transactions`);
  const q = query(collRef, orderBy("dateTime", "desc"));
  const documents = await getDocs(q);
  if (documents.metadata.fromCache) {
    throw "401";
  }
  const arr = [];
  documents.docs.forEach((i) => arr.push(i.data()));
  for (let i of arr) {
    i.dateTime = i.dateTime.toDate().toString();
  }
  return arr;
}

export async function distributionLoader({ request }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }

  const collRef = collection(firestore, `users/${user.uid}/transactions`);
  const q = query(collRef, orderBy("dateTime", "desc"));
  const documents = await getDocs(q);
  if (documents.metadata.fromCache) {
    throw "401";
  }
  const arr = [];
  documents.docs.forEach((i) => arr.push(i.data()));
  for (let i of arr) {
    i.dateTime = i.dateTime.toDate().toString();
  }
  return arr;
}

export async function dashboardLoader({ request }) {
  const user = await getCurrentUser();
  if (user === null) {
    throw "402";
  }
  const collRef = collection(firestore, `users/${user.uid}/transactions`);
  const q = query(collRef, orderBy("dateTime", "desc"));
  const documents = await getDocs(q);
  if (documents.metadata.fromCache) {
    throw "401";
  }

  let arr = [];
  documents.docs.forEach((i) => arr.push(i.data()));
  // console.log(arr);
  const ans = [];
  const currDate = new Date().getDate();
  const currMonth = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();
  for (let i of arr) {
    const date = i.dateTime.toDate();
    date.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((today - date) / 864e5);
    if (diff <= 31) {
      ans.push(i);
    }
  }
  // console.log(ans);
  return ans;
}

export default function FirebaseProvider({ children }) {
  async function getRangeOfSplits(startDoc, count) {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      const collRef = collection(firestore, `users/${user.uid}/splits`);
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
      // // console.log(res);
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
      // // console.log("newres", newres);
      const nextExists = !newres.empty;
      return { res, lastDoc, nextExists };
    } catch (err) {
      // console.log(err);
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
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      const collRef = collection(firestore, `users/${user.uid}/splits`);

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Operation timed out"));
        }, 20000);
      });

      const res = await Promise.race([addDoc(collRef, data), timeoutPromise]);

      return new Response(
        JSON.stringify({ message: "Data Appended Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      // console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Append Data." }),
        { status: 403 }
      );
    }
  }

  async function deleteSplit(id) {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      // console.log(id);

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Operation timed out"));
        }, 20000);
      });

      const res = await Promise.race([
        deleteDoc(doc(firestore, `users/${user.uid}/splits`, id)),
        timeoutPromise,
      ]);

      return new Response(
        JSON.stringify({ message: "Data Deleted Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      // console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Delete Data." }),
        { status: 403 }
      );
    }
  }

  async function addBill(data) {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      // console.log(data);
      const collRef = collection(firestore, `users/${user.uid}/vault`);
      const billDate = data.billDate;
      const billId = v4();
      const billDesc = data.billDesc;
      const billName = data.billName;
      const billTotal = data.billTotal;
      const createdOn = data.createdOn;
      let enteredExpireDate = null;
      if (data.expireDate != null) {
        enteredExpireDate = new Date(data.expireDate);
        enteredExpireDate.setHours(0, 0, 0, 0);
      }
      const enteredExpireDuration = data.expireDuration;
      const warrantyAdded = data.warrantyAdded;
      const expiryDate = data.expiryDate;
      const images = [];
      for (let i of data.fileObjects) {
        // console.log("1");
        let nameOfImage = v4() + i.name;
        const imageRef = ref(
          storage,
          `vault/${user.uid}/${billId}/${nameOfImage}`
        );
        // console.log("ewwef");
        const result = uploadBytesResumable(imageRef, i);
        // console.log("wewrwerrfrfefef");
        const timer = setTimeout(() => {
          // console.log("wefwef");
          result.cancel();
        }, 20000);
        await result;
        clearTimeout(timer);
        images.push(nameOfImage);
      }
      // console.log("2");
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
      // console.log(obj);
      const result = await addDoc(collRef, obj);
      // console.log("3");

      // console.log("hellllo");
      return new Response(
        JSON.stringify({ message: "Data Appended Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      // console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Append Data." }),
        { status: 403 }
      );
    }
  }

  async function deleteBill(id) {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      // console.log(id);
      const collRef = collection(firestore, `users/${user.uid}/vault`);
      const q = query(collRef, where("billId", "==", id));
      const document = await getDocs(q);
      const docId = document.docs[0].id;
      for (let i of document.docs[0].data().images) {
        const url = i;
        const reference = ref(storage, `vault/${user.uid}/${id}/${url}`);
        const res = await deleteObject(reference);
      }
      const res = await deleteDoc(
        doc(firestore, `users/${user.uid}/vault`, docId)
      );
      return new Response(
        JSON.stringify({ message: "Data Deleted Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      // console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Delete Data." }),
        { status: 403 }
      );
    }
  }

  // async function getCurrUser() {
  //   return auth.currentUser;
  // }

  async function signUp(email, password, firstName, lastName) {
    try {
      // console.log(email, password);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(lastName, firstName);
      const user = await getCurrentUser();
      const r = await updateProfile(user, {
        displayName: firstName,
        photoURL: "",
      });
      const result = setDoc(doc(firestore, "users", auth.currentUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      await signOut(auth);
      return "success";
    } catch (err) {
      // console.log(err);
      return new Response(JSON.stringify({ message: err }), {
        status: 500,
      });
    }
  }

  async function signIn(email, password) {
    try {
      // console.log(email, password);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = await getCurrentUser();
      return "success";
    } catch (err) {
      // console.log(err);
      return new Response(JSON.stringify({ message: err }), {
        status: 500,
      });
    }
  }

  async function logOutCurrUser() {
    try {
      const res = signOut(auth);
      return new Response(JSON.stringify({ message: "Sign Out Successful" }), {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: "Could not Sign Out" }), {
        status: 403,
      });
    }
  }

  async function addTransaction(data) {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      const collRef = collection(firestore, `users/${user.uid}/transactions`);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Operation timed out"));
        }, 20000);
      });

      const res = await Promise.race([addDoc(collRef, data), timeoutPromise]);
      return new Response(
        JSON.stringify({ message: "Data Appended Successfully" }),
        { status: 200 }
      );
    } catch (err) {
      // console.log(err);
      return new Response(
        JSON.stringify({ message: "Could not Append Data." }),
        { status: 403 }
      );
    }
  }

  async function fetchAllTransactions() {
    try {
      const user = await getCurrentUser();
      if (user === null) {
        throw "error";
      }
      const collRef = collection(firestore, `users/${user.uid}/transactions`);
      let q = query(collRef, orderBy("dateTime", "desc"));
      let res = await getDocs(q);
      // console.log(res);
      if (res.metadata.fromCache) {
        throw "error";
      }
      let arr = [];
      res.docs.forEach((i) => arr.push(i.data()));
      return arr;
    } catch (err) {
      // console.log(err);
      return "error";
      // const res = new Response(
      //   JSON.stringify({ message: "Could not fetch data." }),
      //   {
      //     status: 500,
      //   }
      // );
      // return res;
    }
  }

  const initialContext = {
    getRangeOfSplits,
    addSplit,
    deleteSplit,
    addBill,
    deleteBill,
    addTransaction,
    fetchAllTransactions,
    signUp,
    logOutCurrUser,
    signIn,
  };

  return (
    <FirebaseContext.Provider value={initialContext}>
      {children}
    </FirebaseContext.Provider>
  );
}
