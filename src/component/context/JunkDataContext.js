import React, { useEffect, useState, createContext } from "react";
import { child, get } from "firebase/database";
import { dbRef } from "../../firebase";
import Loading from "../loading/Loading";

const JunkNumContext = createContext({
  junkData: [],
  refrashFn: () => {},
});

export const JunkDataProvider = (props) => {
  const [junkData, setJunkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(-1);

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
          setJunkData(numbers.reverse());
        } else {
          console.log("no data");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  const refreshControl = () => {
    setRefresh(refresh * -1);
  };
  const data = {
    junkData: junkData,
    refreshFn: refreshControl,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <JunkNumContext.Provider value={data}>
      {props.children}
    </JunkNumContext.Provider>
  );
};

export default JunkNumContext;
