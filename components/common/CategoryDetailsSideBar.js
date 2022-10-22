import Image from "next/image";
import Link from "next/link";
import React from "react";
import SmallAdd from "./advertizer/SmallAd";

const CategoryDetailsSideBar = ({ page }) => {
  const latestnews = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "World News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 2,
      img: "/topnews.png",
      category: "U.S News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 3,
      img: "/topnews.png",
      category: "Politics",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 4,
      img: "/topnews.png",
      category: "New York",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 5,
      img: "/topnews.png",
      category: "Business",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 6,
      img: "/topnews.png",
      category: "Technology",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 7,
      img: "/topnews.png",
      category: "Science",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 8,
      img: "/topnews.png",
      category: "sports",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 9,
      img: "/topnews.png",
      category: "Health",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 10,
      img: "/topnews.png",
      category: "World News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 11,
      img: "/topnews.png",
      category: "U.S News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 12,
      img: "/topnews.png",
      category: "Politics",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 13,
      img: "/topnews.png",
      category: "New York",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 14,
      img: "/topnews.png",
      category: "Business",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 15,
      img: "/topnews.png",
      category: "Technology",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 16,
      img: "/topnews.png",
      category: "Science",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 17,
      img: "/topnews.png",
      category: "sports",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 18,
      img: "/topnews.png",
      category: "Health",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];

  return (
    <section>
      <SmallAdd picture='/ad-1.png' link='https://iqbalhossen-c5422.web.app/' />

      {/* latest news */}
      <div
        className={`some-news ${
          page === "details" ? "h-[900px]" : "h-[430px]"
        }`}
      >
        <b>Latest news:</b>
        {latestnews.map((news) => (
          <Link
            href={`details?category=${news.category}&id=${news._id}`}
            key={news._id}
          >
            <a className='news'>
              <Image
                className='object-contain'
                width={100}
                height={80}
                src={news.img}
                alt=''
              />
              <p className='font-medium col-span-2'>{news.heading}</p>
            </a>
          </Link>
        ))}
      </div>
      <SmallAdd picture='/ad-1.png' link='https://iqbalhossen-c5422.web.app/' />

      {/* most read news */}
      <div className='some-news h-[900px]'>
        <b>Most read:</b>
        {latestnews.map((news) => (
          <Link
            href={`details?category=${news.category}&id=${news._id}`}
            key={news._id}
          >
            <a className='news'>
              <p className='font-medium col-span-2 pl-2'>{news.heading}</p>
              <Image
                className='object-contain'
                width={100}
                height={80}
                src={news.img}
                alt=''
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryDetailsSideBar;
