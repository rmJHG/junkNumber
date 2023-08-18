import React from "react";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const params = useParams();
  console.log(params);

  return <div>{params.searchQuery}</div>;
};

export default SearchResult;
