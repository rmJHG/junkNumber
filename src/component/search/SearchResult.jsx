import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JunkNumContext from "../context/DataContext";
import SearchedJunk from "./SearchedJunk";
import styled from "styled-components";

const SearchResult = () => {
  const params = useParams();
  const searchedNumber = params.searchQuery;
  const searchedReplaceNumber = searchedNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
  const context = useContext(JunkNumContext);
  const data = context.junkData;
  const [hasData, setHasData] = useState(false);
  const filteredData = data.filter((data) => data.number === searchedReplaceNumber);

  useEffect(() => {
    if (filteredData.length >= 1) {
      setHasData(true);
    }
  }, [filteredData.length]);

  return (
    <Wrapper>
      <Container>
        <SearchQuery>
          <p>{searchedReplaceNumber}</p>
          <p>{searchedNumber}</p>
        </SearchQuery>
        {hasData ? (
          <ReportListBox>
            {filteredData.map((res) => {
              return <SearchedJunk key={res.id} postDate={res.postDate} number={res.number} postName={res.postName} postType={res.type} coment={res.coment} />;
            })}
          </ReportListBox>
        ) : (
          <ReportListEmpty>
            <p>신고된 내역이 없습니다.</p>
          </ReportListEmpty>
        )}
      </Container>
    </Wrapper>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const SearchQuery = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p:first-child {
    font-size: 2rem;
  }
  p:last-child {
    font-size: 1.5rem;
  }
`;

const ReportListBox = styled.ol`
  max-height: 550px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  overflow-y: scroll;
`;

const ReportListEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
