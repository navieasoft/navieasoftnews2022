/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const TopTenNews = ({ data }) => {
  if (!data) return null;
  return (
    <div className='space-y-5 my-5 pb-1.5 border-b'>
      {data.map((item) => (
        <Link
          href={`/details?category=${item.category}&id=${item._id}`}
          key={item._id}
        >
          <a className='grid grid-cols-3 gap-2 hover:text-gray-500'>
            <p className='col-span-2 font-medium'>
              {item.headline.slice(0, 60)} {item.headline.length > 60 && "..."}
            </p>
            <div>
              <img
                className='object-cover h-full w-36'
                src={`/assets/${item.mainImg}`}
                alt='news image'
              />
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TopTenNews;
