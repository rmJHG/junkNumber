import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebase";
import { child, get } from "firebase/database";
import { dbRef } from "../../firebase";
import JunkList from "../junk/JunkList";
import SearchJunk from "../junk/SearchJunk";
const MainPage = () => {
  const [junk, setJunk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = () => {
    const userData = firebaseAuth.currentUser;
    if (userData !== null) {
      console.log(userData.email, userData.displayName);
    } else {
      console.log("비로그인중");
    }
  };

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
      <JunkList junk={junk} />
      <button onClick={isLogin}>로그인확인</button>
    </>
  );
};

export default MainPage;
