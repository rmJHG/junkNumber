import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing:border-box;
}
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap");
@font-face {
  font-family: "Ramche";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Ramche.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}
body {
  line-height: 1;
  background-color: #f9f6f0;
}
ol,
ul {
  list-style: none;
  overflow: scroll;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
html,
body {
  min-width: 350px;
  height: 100%;
  min-height: 660px;
  margin: auto;
  padding: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
}
#root {
  width: 100%;
  height: 100%;
  min-width: 280px;
  min-height: auto;
  margin: auto;
  padding: auto;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  text-decoration: none;
  color: black;
}
p {
  font-size: 14px;
}
input {
  /*ios대응*/
  appearance: none;
  -webkit-appearance: none;
}
select {
  /*ios대응*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  color: black;
}
select::-ms-expand {
  display: none; /* 화살표 없애기 for IE10, 11*/
}

button {
  cursor: pointer;
  color: black;
  border: none;
}

input,
select,
textarea {
  border: none;
  outline: none;
  padding: 0.5rem;
}

`;

export default GlobalStyles;
