import React from "react";
import Junk from "./Junk";
import styled from "styled-components";

const RealTimeJunkList = ({ junk }) => {
  const junkData = junk;
  const sliceAndReverseData = junkData.slice(0, 10);

  return (
    <Wrapper>
      <section>
        <HeaderWrapper>
          <div>
            <span>실시간 신고</span>
          </div>
        </HeaderWrapper>

        <Table>
          <colgroup>
            <col width="40%" />
            <col width="40%" />
            <col width="20%" />
          </colgroup>
          <TableHead>
            <tr align="center">
              <td>번호</td>
              <td>작성자</td>
              <td>등록일</td>
            </tr>
          </TableHead>

          <TableList>
            {sliceAndReverseData.map((res, index) => (
              <Junk key={res.id} id={res.id} number={res.number} postName={res.postName} postDate={res.postDate} postMS={res.postMS} postIndex={index + 1} />
            ))}
          </TableList>
        </Table>
      </section>
    </Wrapper>
  );
};

export default RealTimeJunkList;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  @media (max-width: 576px) {
    margin-bottom: 1rem;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin-bottom: 1rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    margin-bottom: 1rem;
  }

  @media (min-width: 1200px) {
    margin-right: 1rem;
  }
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  background-color: #004080;
  font-family: Ramche;
  font-size: 15px;
  color: white;
  border-radius: 10px 10px 0 0;
`;

const Table = styled.table`
  width: 100%;
  tbody > tr {
    border-bottom: 1px solid #ccc;
  }
  td {
    padding: 4px;
    font-size: 14px;
  }
`;
const TableHead = styled.thead`
  border-bottom: 1px solid #ccc;
  background-color: #f9f6f0;
`;

const TableList = styled.tbody`
  border: none;
`;
