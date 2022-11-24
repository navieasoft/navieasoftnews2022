/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OthersNews = ({ data }) => {
  if (!data) return null;
  return (
    <div className='space-y-5'>
      {data.map((item) => (
        <Link href={`/details?id=${item.id}`} key={item.id}>
          <a className='grid grid-cols-3 gap-2 hover:text-gray-500'>
            <img
              className='object-contain h-full w-24'
              src={`/assets/${item.image}`}
              alt='news image'
            />
            <p className='col-span-2 font-medium'>{item.headline}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default OthersNews;
