import React from "react";
import PoliticsBusiness from "./common/PoliticsBusiness";

const PoliticsHighligh = ({ data }) => {
  if (!data) return null;
  return <PoliticsBusiness data={data} />;
};

export default PoliticsHighligh;
