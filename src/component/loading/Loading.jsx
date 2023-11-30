import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoadingIndicator>
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
    </LoadingIndicator>
  );
};

export default Loading;
const loadingAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

const LoadingIndicator = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 3px;
  border-radius: 50%;
  background-color: #004080;
  animation: ${loadingAnimation} 1s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.25s;
  }

  &:nth-child(3) {
    animation-delay: 0.5s;
  }

  &:nth-child(4) {
    animation-delay: 0.75s;
  }
`;
