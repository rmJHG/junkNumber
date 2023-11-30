import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBar = () => {
  const nav = useNavigate();
  const enterFirstNumRef = useRef();
  const enterLastNumRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    const number = e.target.value.replace(/[^0-9]/g, "").replace(/^(\d{3,4})(\d{4})/, "$1-$2");
    enterLastNumRef.current.value = number;
  };

  const searchNumber = (e) => {
    e.preventDefault();
    const enteredFirstNum = enterFirstNumRef.current.value;
    const enteredLastNum = enterLastNumRef.current.value;
    const replaceLastNum = enteredLastNum.replace("-", "");
    nav(`/num/${enteredFirstNum}${replaceLastNum}`);
  };
  return (
    <Wrapper>
      <SearchForm onSubmit={searchNumber}>
        <select ref={enterFirstNumRef}>
          <option value="02">02</option>
          <option value="031">031</option>
          <option value="032">032</option>
          <option value="033">033</option>
          <option value="041">041</option>
          <option value="042">042</option>
          <option value="043">043</option>
          <option value="044">044</option>
          <option value="051">051</option>
          <option value="052">052</option>
          <option value="053">053</option>
          <option value="054">054</option>
          <option value="055">055</option>
          <option value="061">061</option>
          <option value="062">062</option>
          <option value="063">063</option>
          <option value="064">064</option>
          <option value="010">010</option>
          <option value="070">070</option>
        </select>

        <input type="text" placeholder="전화번호" onChange={handleChange} required ref={enterLastNumRef} maxLength={9} />
        <button>검색</button>
      </SearchForm>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  padding: 10% 0;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  select {
    border: none;
    padding: 0 10px;
  }
  input,
  button {
    border: none;
  }
  input {
    width: 300px;
    height: 30px;
    padding: 3px 15px;
  }
  button {
    width: 15%;
    border-radius: 0 10px 10px 0;
    background-color: #004080;
    color: white;
  }
`;
