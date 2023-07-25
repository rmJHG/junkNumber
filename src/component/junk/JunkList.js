import React from "react";
import Junk from "./Junk";

const JunkList = (props) => {
  const junkData = props.junk;

  return (
    <ul>
      {junkData.map((res) => (
        <Junk
          key={res.id}
          id={res.id}
          number={res.number}
          postName={res.postName}
          postDate={res.postDate}
          postMS={res.postMS}
        />
      ))}
    </ul>
  );
};

export default JunkList;
