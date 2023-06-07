import React from "react";
import { firebaseDb } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ReportJunk = () => {
  // const data = {
  //   name: "han",
  //   ho: "gye",
  // };

  const addData = async (event) => {
    event.preventDefault();
    try {
      const a = doc(firebaseDb, "users", "name");
      const targetDoc = await getDoc(a);
      console.log(targetDoc.data())

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      ReportJun
      <form onSubmit={addData}>
        <button>게시</button>
      </form>
    </div>
  );
};

export default ReportJunk;
