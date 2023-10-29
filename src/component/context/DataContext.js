import React, { useEffect, useState, createContext } from "react";
import { child, get } from "firebase/database";
import { dbRef, postDbRef } from "../../firebase";
import Loading from "../loading/Loading";

const DataContext = createContext({
  junkData: [],
  refrashFn: () => {},
});

export const DataProvider = (props) => {
  const [junkData, setJunkData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(-1);

  useEffect(() => {
    const numbers = [];
    const posts = [];

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
          setJunkData(numbers.reverse());
        } else {
          console.log("no data");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });

    get(postDbRef, "/").then((res) => {
      if (res.exists()) {
        const data = res.val();
        for (const key in data) {
          const post = {
            id: key,
            ...data[key],
          };
          posts.push(post);
        }
        setPostData(posts);
      } else {
        console.log("no data");
      }
    });
  }, [refresh]);

  const refreshControl = () => {
    setRefresh(refresh * -1);
  };

  const data = {
    junkData: junkData,
    postData: postData,
    refreshFn: refreshControl,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};

export default DataContext;
