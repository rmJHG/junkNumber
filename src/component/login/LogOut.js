import { firebaseAuth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogOut = (props) => {
    const nav = useNavigate();

    const logOutBtnClick = () => {
        signOut(firebaseAuth);
        nav("/")
        
      };

return <button onClick={logOutBtnClick}>로그아웃</button>
}


export default LogOut;