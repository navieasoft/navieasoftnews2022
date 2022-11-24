/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const TopNews = ({ data }) => {
  if (!data) return null;
  return (
    <div className='top-news-conainer'>
      <div className='col-span-2 lg:col-span-1'>
        <Link href={`/details?category=${data[0]?.category}&id=${data[0]?.id}`}>
          <a className='topnews_1'>
            <h3>{data[0]?.headline}</h3>
            <p>{data[0]?.body.slice(0, 300)}...</p>
          </a>
        </Link>
        <Link href={`/details?category=${data[1]?.category}&id=${data[1]?.id}`}>
          <a className='topnews_2 border-b md:border-b-0 block'>
            <h3>{data[1]?.headline}</h3>
          </a>
        </Link>
      </div>

      <Link href={`/details?category=${data[2]?.category}&id=${data[2]?.id}`}>
        <a className='topnews_3'>
          <img
            className='object-cover object-center h-60 w-full'
            src={`/assets/${data[2]?.mainImg}`}
            alt='news image'
          />
          <h3>{data[2]?.heading}</h3>
          <p>{data[2]?.body.slice(0, 300)}...</p>
        </a>
      </Link>
    </div>
  );
};

export default TopNews;
