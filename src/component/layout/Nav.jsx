import { Link } from "react-router-dom";
import classes from "./style/Nav.module.css";

const Nav = (props) => {
  return (
    <section>
      <nav>
        <ul className={classes.navList}>
          <li>
            <Link to="/">메인</Link>
          </li>
          <li>
            <Link to="/community/1">커뮤니티</Link>
          </li>
          <li>
            <Link to="/report">피싱번호추가</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
