import Image from "next/image";
import Link from "next/link";
import React from "react";
import LergeAdd from "../components/common/advertizer/LergeAdd";
import SmallAdd from "../components/common/advertizer/SmallAd";
import CategoryDetailsSideBar from "../components/common/CategoryDetailsSideBar";
import ScrollingHighlight from "../components/common/ScrollingHighlight";
import TopMenus from "../components/common/TopMenus";
import TopPart from "../components/common/TopPart";

const category = () => {
  const data = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "World News",
      heading:
        "Combat Veterans, Eyeing House, Strike From the Right Strike Combat Veterans, Eyeing House, Strike From the Right Strike",
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
      category: "Education",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 11,
      img: "/topnews.png",
      category: "Science",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 12,
      img: "/topnews.png",
      category: "sports",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 13,
      img: "/topnews.png",
      category: "Health",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 14,
      img: "/topnews.png",
      category: "Education",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 15,
      img: "/topnews.png",
      category: "Health",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 16,
      img: "/topnews.png",
      category: "Education",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];

  return (
    <div>
      <TopPart page='details' />
      <TopMenus />
      <ScrollingHighlight />
      <LergeAdd picture={"/longadd.png"} />
      <section className='category-wrapper'>
        <section className='col-span-2'>
          <Link href={`details?category=${data[0].category}&id=${data[0]._id}`}>
            <a className='first-item'>
              <Image
                className='object-contain'
                width={500}
                height={300}
                src={data[0].img}
                alt=''
              />
              <p className='font-medium'>{data[0].heading}</p>
              <p>{data[0].body.slice(0, 300)}...</p>
            </a>
          </Link>

          <LergeAdd picture={"/longadd.png"} />

          <div className='second-item'>
            {data.slice(1, 7).map((news) => (
              <Link
                href={`details?category=${news.category}&id=${news._id}`}
                key={news._id}
              >
                <a className='news'>
                  <p className='font-medium py-2 px-3'>{news.heading}</p>
                  <Image
                    className='object-cover object-center rounded-r'
                    width={200}
                    height={100}
                    src={news.img}
                    alt=''
                  />
                </a>
              </Link>
            ))}
          </div>

          <LergeAdd picture={"/longadd.png"} />

          <div className='third-item'>
            {data.slice(8, data.length).map((news) => (
              <Link
                href={`details?category=${news.category}&id=${news._id}`}
                key={news._id}
              >
                <a className='news'>
                  <Image
                    className='object-cover object-center rounded-t'
                    width={200}
                    height={100}
                    src={news.img}
                    alt=''
                  />
                  <p className='font-medium py-2 px-3'>{news.heading}</p>
                </a>
              </Link>
            ))}
          </div>
          <div className='flex justify-end mt-5 mr-5'>
            <button className='btn'>See More</button>
          </div>
        </section>

        {/* side bar */}
        <CategoryDetailsSideBar page={"category"} />
      </section>
    </div>
  );
};

export default category;
