/* eslint-disable @next/next/no-img-element */
import { Markup } from "interweave";
import Link from "next/link";
import React from "react";

const Features = ({ data }) => {
  if (!data) return null;
  return (
    <div className='mx-5 lg:mx-10 py-4 border-b'>
      <p>Features</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 md:mt-4'>
        <Link href={`/details?id=${data[0].id}`}>
          <a className='flex flex-col gap-3 text-center hover:text-gray-500'>
            <img
              className='object-contain'
              src={`/assets/${data[0].image}`}
              alt=''
            />
            <h3>{data[0].headline}</h3>
            <Markup content={`${data[0].body.slice(0, 700)}...`} />
          </a>
        </Link>

        <div className='md:space-y-3 md:grid grid-cols-2 gap-x-6 gap-y-2 hover:text-gray-500'>
          {data.slice(1, data.length).map((item) => (
            <Link href={`/details?id=${item.id}`} key={item.id}>
              <a className='flex flex-col gap-y-1 py-3 md:py-0 border-t md:border-t-0'>
                <img
                  className='object-cover object-center'
                  src={`/assets/${item.image}`}
                  alt='image'
                />
                <h3>{item.headline}</h3>
                <Markup content={`${item.body.slice(0, 100)}...`} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
