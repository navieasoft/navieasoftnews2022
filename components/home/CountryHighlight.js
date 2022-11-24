/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const CountryHighlight = ({ data }) => {
  if (!data) return null;
  return (
    <div className='country-highlight-container mt-5'>
      <Link href={`/details?id=${data[0].id}`}>
        <a className='first-highlight'>
          <div>
            <h3 className='text-xl font-medium mb-3'>{data[0].headline}</h3>
            <p className='text-justify'>{data[0].body.slice(0, 300)}...</p>
          </div>
          <div className='lg:col-span-2 flex justify-center'>
            <img
              className='object-cover object-top h-64 w-full'
              src={`/assets/${data[0].image}`}
              alt='news image'
            />
          </div>
        </a>
      </Link>
      <div className='item'>
        {data.slice(1, data.length).map((item) => (
          <Link href={`/details?id=${item.id}`} key={item.id}>
            <a className='border-b py-4 px-4 hover:text-gray-500'>
              <h3 className='font-semibold text-xl'>{item.headline}</h3>
              <p className='text-justify'>{item.body.slice(0, 300)}...</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryHighlight;
