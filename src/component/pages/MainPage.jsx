import React, { useEffect, useState, useContext } from "react";
import RealTimeJunkList from "../junk/RealTimeJunkList";
import TopReportedJunkList from "../junk/TopReportedJunkList";
import DataContext from "../context/DataContext";
import SearchBar from "../search/SearchBar";
import styled from "styled-components";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";

const MainPage = () => {
  const [junk, setJunk] = useState([]);

  const context = useContext(DataContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      user && user.emailVerified === false && signOut(firebaseAuth);
    });
    if (context.junkData !== undefined) {
      setJunk(context.junkData);
    }
  }, [context.junkData]);

  return (
    <Container>
      <div>
        <SearchBar />
      </div>
      <TableContainer>
        <RealTimeJunkList junk={junk} />
        <TopReportedJunkList junk={junk} />
      </TableContainer>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  @media (max-width: 576px) {
    padding: 0;
    table:first-child {
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    margin: 0 5rem;
    padding: 0;
    table:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin: 0 8rem;
    padding: 0 5%;
    table:first-child {
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 0 8%;
  }

  @media (min-width: 1200px) {
    padding: 0 10rem;
  }
`;

const TableContainer = styled.div`
  @media (min-width: 1200px) {
    display: flex;
  }
`;
