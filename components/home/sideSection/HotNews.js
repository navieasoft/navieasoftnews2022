/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const HotNews = ({ data }) => {
  if (!data) return null;
  return (
    <Link href={`/details?category=${data.category}&id=${data.id}`}>
      <a className='hot-new-container'>
        <img
          className='object-contain h-52 w-full'
          src={`/assets/${data.mainImg}`}
          alt='news'
        />
        <h3>{data.headline}</h3>
        <p>{data.body.slice(0, 100)}...</p>
      </a>
    </Link>
  );
};

export default HotNews;
