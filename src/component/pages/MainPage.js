import React, { useEffect, useState } from "react";
import { child, get } from "firebase/database";
import { dbRef } from "../../firebase";
import RealTimeJunkList from "../junk/RealTimeJunkList";
import SearchJunk from "../junk/SearchJunk";
import TopReportedJunkList from "../junk/TopReportedJunkList";

const MainPage = () => {
  const [junk, setJunk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //db에서 전화번호 리스트 가져오기
  useEffect(() => {
    const numbers = [];
    get(child(dbRef, `/`))
      .then((res) => {
        if (res.exists()) {
          const data = res.val();
          for (const key in data) {
            const number = {
              id: key,
              ...data[key],
            };
            numbers.push(number);
          }
          setJunk(numbers);
          setIsLoading(false);
        } else {
          console.log("no data");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <>
      <SearchJunk />
      <RealTimeJunkList junk={junk} />
      <TopReportedJunkList junk={junk} />
    </>
  );
};

export default MainPage;
