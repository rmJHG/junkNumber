import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { firebaseAuth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styled from "styled-components";

const Header = () => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const titleCLickEvent = () => {
    nav("/");
  };
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  const logOutBtnClick = () => {
    signOut(firebaseAuth);
    setIsOpen(!isOpen);
    nav("/");
  };
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setName(user.displayName);
        setLoading(false);
      } else {
        setName("");
        setLoading(false);
      }
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <HeaderContainer>
      {isOpen && (
        <Menu onClick={modalHandler}>
          <li>
            <p onClick={logOutBtnClick}>로그아웃</p>
          </li>
        </Menu>
      )}
      <HeaderContent>
        <TitleWrapper onClick={titleCLickEvent}>
          <p>JunkNumber</p>
        </TitleWrapper>
        {loading ? (
          <p>LOADING</p>
        ) : name ? (
          <UserInfoContainer onClick={modalHandler}>
            <p>{name}</p>
            <ModalStateContainer>{isOpen ? <p>▼</p> : <p>▽</p>}</ModalStateContainer>
          </UserInfoContainer>
        ) : (
          <LoginBtnWrapper>
            <Link to="/Login">
              <p>로그인</p>
            </Link>
          </LoginBtnWrapper>
        )}
      </HeaderContent>

      <div>
        <Nav />
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #004080;

  p {
    color: #fffff0;
    font-family: Ramche;
  }
`;

const HeaderContent = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-left: 3%;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const UserInfoContainer = styled.div`
  margin-right: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-right: 0.4rem;
    font-family: "Nanum Gothic Coding", monospace;
  }
`;

const ModalStateContainer = styled.div`
  p {
    font-size: 10px;
  }
`;

const LoginBtnWrapper = styled.div`
  margin-right: 1rem;
`;

const Menu = styled.ul`
  top: 35px;
  border-radius: 10px;
  position: fixed;
  left: calc(100% - 5rem);
  background-color: gray;

  li {
    width: 100%;
    padding: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li > p {
    width: 100%;
    padding: 0.5rem;
    font-family: "Courier New", Courier, monospace;
  }
`;
