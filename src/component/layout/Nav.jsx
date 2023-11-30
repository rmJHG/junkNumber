import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = (props) => {
  return (
    <section>
      <nav style={{ background: "#d3d3d3" }}>
        <NavList>
          <li>
            <Link to="/">메인</Link>
          </li>
          <li>
            <Link to="/community/1">커뮤니티</Link>
          </li>
          <li>
            <Link to="/report">피싱번호추가</Link>
          </li>
        </NavList>
      </nav>
    </section>
  );
};

export default Nav;

const NavList = styled.ul`
  height: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  li {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: #333333;
  }
`;
