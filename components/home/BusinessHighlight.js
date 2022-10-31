import React from "react";
import PoliticsBusiness from "./common/PoliticsBusiness";

const BusinessHighlight = ({ data }) => {
  if (!data) return null;
  return <PoliticsBusiness data={data} />;
};

export default BusinessHighlight;
