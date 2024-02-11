import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Layout = (props) => {
  return (
    <Container>
      <Header />
      <MainSection>{props.children}</MainSection>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  min-width: 280px;
  height: 100%;
`;

const MainSection = styled.section`
  min-width: 100%;
  min-height: calc(100% - 7.5rem);
  margin: 0 auto;
  padding: auto;
  @media (max-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    max-width: 700px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 991px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    max-width: 1190px;
  }
  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;
