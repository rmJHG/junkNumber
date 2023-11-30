import React from "react";
import styled from "styled-components";

const SearchedJunk = ({ postName, postDate, postType, number, coment }) => {
  return (
    <ReportedList>
      <WriterInfo>
        <div>
          {postName} / {postType}
        </div>
        <div>{postDate}</div>
      </WriterInfo>
      <div>{coment}</div>
    </ReportedList>
  );
};

export default SearchedJunk;

const ReportedList = styled.li`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
  padding: 10px;
  display: grid;

  &:last-child {
    border: none;
    margin-bottom: 5px;
  }
`;

const WriterInfo = styled.div`
    width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
