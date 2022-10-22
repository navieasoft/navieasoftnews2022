import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const HotNews = () => {
  const data = {
    _id: 1,
    img: "/topnews.png",
    category: "World News",
    heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
    body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
  };

  return (
    <Link href={`/details?category=${data.category}&id=${data._id}`}>
      <a className='hot-new-container'>
        <Image
          className='object-contain'
          height={200}
          width={300}
          src={data.img}
          alt='news'
        />
        <h3>{data.heading}</h3>
        <p>{data.body.slice(0, 100)}...</p>
      </a>
    </Link>
  );
};

export default HotNews;
