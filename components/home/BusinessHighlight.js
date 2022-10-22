import React from "react";
import PoliticsBusiness from "./common/PoliticsBusiness";

const BusinessHighlight = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy5.png",
      category: "business",
      heading: "Listen to the 'This American Life'",
      body: "business highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy5.png",
      category: "business",
      heading: "The modern love Podcast",
      body: "business highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy5.png",
      category: "business",
      heading: "Listen to the 'This American Life'",
      body: " business highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return <PoliticsBusiness data={data} />;
};

export default BusinessHighlight;
