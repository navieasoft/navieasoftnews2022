/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Markup } from "interweave";

const OtherNews = ({ data }) => {
  if (!data) return null;
  return (
    <div className='mx-5 lg:mx-10 mt-3 border-b'>
      <p>In Other News</p>
      <div className='other-news-container'>
        <div className='col-span-2 lg:col-span-1 border-b md:border-b-0 pb-3 md:pb-0'>
          <Link href={`/details?id=${data[0].id}`}>
            <a className='flex flex-col gap-3 hover:text-gray-500'>
              <img
                className='object-cover object-center'
                src={`/assets/${data[0].image}`}
                alt=''
              />
              <h3>{data[0].headline}</h3>

              <Markup content={`${data[0]?.body.slice(0, 350)}...`} />
            </a>
          </Link>
        </div>

        <div className='space-y-2 md:border-r md:pr-3 lg:border-r-0 lg:pr-0 mt-3 md:mt-0'>
          {data.slice(1, 4).map((item, i, arr) => (
            <Link href={`/details?id=${item.id}`} key={item.id}>
              <a
                className={`hover:text-gray-500 block ${
                  arr.length - 1 !== i ? "border-b pb-2" : ""
                }`}
              >
                <h3>{item.headline}</h3>
                <Markup content={`${item.body.slice(0, 150)}...`} />
              </a>
            </Link>
          ))}
        </div>

        <div className='space-y-5 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0'>
          {data.slice(4, data.length).map((item) => (
            <Link href={`/details?id=${item.id}`} key={item.id}>
              <a className='grid grid-cols-3 gap-4 items-center hover:text-gray-500'>
                <img
                  className='object-cover object-center '
                  src={`/assets/${item.image}`}
                  alt=''
                />
                <p className='col-span-2 text-left font-medium text-lg'>
                  {item.headline}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherNews;
