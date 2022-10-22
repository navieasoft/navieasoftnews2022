import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopNews = () => {
  const news = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "topnews",
      heading: "Combat Veterans, Eyeing House, Strike From the Right",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 2,
      img: "/topnews.png",
      category: "topnews",
      heading:
        "Putin Moves to Cement Annexations in Ukraine Combat Veterans, Eyeing House, Strike From the Right",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 3,
      img: "/topnews.png",
      category: "topnews",
      heading:
        "Two men opened fire on Russian soldiers during training, killing 11 and wounding 15, state-run news outlets said.",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];

  return (
    <div className='top-news-conainer'>
      <div className='col-span-2 lg:col-span-1'>
        <Link href={`/details?category=${news[0].category}&id=${news[0]._id}`}>
          <a className='topnews_1'>
            <h3>{news[0].heading}</h3>
            <p>{news[0].body.slice(0, 300)}...</p>
          </a>
        </Link>
        <Link href={`/details?category=${news[1].category}&id=${news[1]._id}`}>
          <a className='topnews_2 block'>
            <h3>{news[1].heading}</h3>
          </a>
        </Link>
      </div>

      <Link href={`/details?category=${news[2].category}&id=${news[2]._id}`}>
        <a className='topnews_3'>
          <Image
            className='object-cover object-center'
            height={250}
            width={500}
            src={news[2].img}
            alt='news image'
          />
          <h3>{news[2].heading}</h3>
          <p>{news[2].body.slice(0, 300)}...</p>
        </a>
      </Link>
    </div>
  );
};

export default TopNews;
