import React from "react";
import PoliticsBusiness from "./common/PoliticsBusiness";

const PoliticsHighligh = () => {
  const data = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "politics",
      heading: "Listen to the 'This American Life'",
      body: "politics highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/topnews.png",
      category: "politics",
      heading: "The modern love Podcast",
      body: "politics highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/topnews.png",
      category: "politics",
      heading: "Listen to the 'This American Life'",
      body: " politic highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return <PoliticsBusiness data={data} />;
};

export default PoliticsHighligh;
