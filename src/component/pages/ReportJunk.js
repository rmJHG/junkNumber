import React from "react";
import { fireebaseDb } from "../../firebase";
import { ref, set } from "firebase/database";

const ReportJunk = () => {
  const db = ref(fireebaseDb, 'numbers')


  
  const addData = async (e) => {
    e.preventDefault();
    set(db, {
      name:"hanggasdg",
      hm : "guy"
    })
  };
  return (
    <>
      ReportJunk
      <form onSubmit={addData}>
        <button>게시</button>
      </form>
    </>
  );
};

export default ReportJunk;
