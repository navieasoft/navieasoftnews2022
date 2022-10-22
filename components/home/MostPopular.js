import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const MostPopular = () => {
  const data = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "popular",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 2,
      img: "/topnews.png",
      category: "popular",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 3,
      img: "/topnews.png",
      category: "popular",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 4,
      img: "/topnews.png",
      category: "popular",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 5,
      img: "/topnews.png",
      category: "popular",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];
  return (
    <div className='mx-5 lg:mx-10 my-5 border-b pb-3'>
      <p>Most Popular</p>
      <GaneralPattern data={data} isCategory={false} />
    </div>
  );
};

export default MostPopular;
