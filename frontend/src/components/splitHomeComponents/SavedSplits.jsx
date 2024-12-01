import SplitBox from "./SplitBox";
import { useState, useEffect } from "react";
import { useFirebase } from "../../store/firebase-context";

export default function SavedSplits() {
  const firebase = useFirebase();
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState("Fetching Data...");
  const [loadMore, setLoadMore] = useState(false);
  const [finalDoc, setFinalDoc] = useState(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    async function initialFetch() {
      const reply = await firebase.getRangeOfSplits(finalDoc, 5);
      // console.log(reply);
      if (reply.res === null) {
        setLoading("No Splits Saved");
        setHide(true);
        return;
      }
      if (reply.status === 500 || reply.res.metadata.fromCache === true) {
        setLoading("ERROR: Cannot Fetch Data");
        setHide(true);
        return;
      }
      if (!reply.nextExists) {
        setHide(true);
      }
      const documents = reply.res.docs;
      const lastDoc = reply.lastDoc;
      setFinalDoc(lastDoc);
      const arr = [];
      documents.forEach((element) => {
        arr.push({ ...element.data(), docId: element.id });
      });
      setSplits((preval) => {
        return [...preval, ...arr];
      });
      setLoading(null);
    }
    initialFetch();
  }, []);

  // console.log(splits);

  async function loadHandle() {
    setLoadMore(true);
    const reply = await firebase.getRangeOfSplits(finalDoc, 10);
    // console.log(reply);
    if (reply.status === 500 || reply.res.metadata.fromCache === true) {
      alert("Error Loading Data");
      setLoadMore(false);
      return;
    }
    if (!reply.nextExists) {
      setHide(true);
    }
    setLoadMore(false);
    const documents = reply.res.docs;
    const lastDoc = reply.lastDoc;
    setFinalDoc(lastDoc);
    const arr = [];
    documents.forEach((element) => {
      arr.push({ ...element.data(), docId: element.id });
    });
    setSplits((preval) => {
      return [...preval, ...arr];
    });
  }

  return (
    <>
      <div className="mx-[20px] flex flex-wrap gap-x-3 gap-y-3 sm:gap-x-5  sm:gap-y-5">
        {loading != null ? (
          <p className="text-sm sm:text-base p-2">{loading}</p>
        ) : (
          splits.map((split) => {
            // console.log(split);
            return (
              <SplitBox
                setSplitState={setSplits}
                key={split.docId}
                data={split}
              />
            );
          })
        )}
      </div>
      <div className="flex h-[100px] flex-grow">
        {loadMore === true ? (
          <p className="ml-auto underline-offset-8 mt-[30px] mr-[30px] text-sm sm:text-base m-3">
            Loading...
          </p>
        ) : hide === false ? (
          <button
            className="underline ml-auto underline-offset-8 mt-[30px] mr-[30px] text-sm sm:text-base m-3"
            onClick={loadHandle}
          >
            Load More
          </button>
        ) : null}
      </div>
    </>
  );
}
