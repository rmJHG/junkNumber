import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterData>
        <p>contact : jhg990508@gmail.com</p>
      </FooterData>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: #323232;
  color: rgb(240, 235, 235);
`;

const FooterData = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
