import React from "react";
import styled from "styled-components";

const TopReportedJunkList = (props) => {
  const countDuplicates = (arr, prop) => {
    const countMap = new Map();
    arr.forEach((item) => {
      const key = item[prop];
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });
    return countMap;
  };

  const data = countDuplicates(props.junk, "number");

  const sortedData = Array.from(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <Wrapper>
      <section>
        <HeaderWrapper>
          <div>
            <span>많이 신고된 순위</span>
          </div>
        </HeaderWrapper>

        <Table>
          <TableHead>
            <tr align="center">
              <td></td>
              <td>번호</td>
              <td>신고된 수</td>
            </tr>
          </TableHead>

          <TableList>
            {sortedData.map(([number, count], index) => (
              <tr align="center" key={number}>
                <td>{index + 1}</td>
                <td>{number}</td>
                <td>{count}</td>
              </tr>
            ))}
          </TableList>
        </Table>
      </section>
    </Wrapper>
  );
};

export default TopReportedJunkList;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
`;
const HeaderWrapper = styled.header`
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
  td {
    padding: 4px;
    font-size: 14px;
  }
`;

const TableHead = styled.thead`
  background-color: #f9f6f0;
  border-bottom: 1px solid #ccc;
  tr {
    /* border-bottom: 1px solid #ccc; */
  }
`;

const TableList = styled.tbody`
  tr {
    border-bottom: 1px solid #ccc;
  }
  tr:last-child {
    border: none;
  }
  tr:nth-child(1),
  tr:nth-child(2),
  tr:nth-child(3) > td {
    font-weight: 700;
    background-color: #f9f6f0;
  }
`;
