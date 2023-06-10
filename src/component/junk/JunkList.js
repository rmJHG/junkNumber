import React from "react";
import Junk from "./Junk";

const JunkList = (props) => {
  const junkData = props.junk;
  return (
   <ul>
    {junkData.map((res) => (<Junk key={res.id} id={res.id} data={res.number} />)
        
      )}
   </ul>
  );
};

export default JunkList;
