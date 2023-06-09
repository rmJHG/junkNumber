import { useState } from "react";
import ReactDOM from "react-dom";


const Portal = () => {
  const [show, setShow] = useState(false);

  
  const btnClick = () => {
    setShow(true);
  };
  return (
    <>
      <button onClick={btnClick}>test Portal</button>
      {show && ReactDOM.createPortal(<div>hello@@</div>, document.getElementById("portalTest"))}

    </>
  );
};


export default Portal;