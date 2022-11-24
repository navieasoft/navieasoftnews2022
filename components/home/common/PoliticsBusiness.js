/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PoliticsBusiness = ({ data }) => {
  return (
    <div className='mt-4 politics-business-highligh'>
      <Link href={`/details?category=${data[0].category}&id=${data[0].id}`}>
        <a className='first-item'>
          <div>
            <h3 className='text-xl font-medium mb-3'>{data[0].headline}</h3>
            <p className='text-justify'>{data[0].body.slice(0, 300)}...</p>
          </div>
          <div className='lg:col-span-2 flex justify-center lg:justify-end'>
            <img
              className='object-cover object-top h-64 w-full'
              src={`/assets/${data[0].mainImg}`}
              alt='news image'
            />
          </div>
        </a>
      </Link>
      <div className='md:grid grid-cols-2 lg:grid-cols-3 py-3'>
        <Link href={`/details?category=${data[1].category}&id=${data[1].id}`}>
          <a className='second-item'>
            <div className='col-span-2'>
              <h3 className='text-xl font-medium mb-3'>{data[1].headline}</h3>
              <p className='text-justify'>{data[1].body.slice(0, 300)}...</p>
            </div>
            <div className='hidden lg:flex justify-center'>
              <img
                className='object-cover object-center h-full w-full'
                src={`/assets/${data[1].mainImg}`}
                alt='news image'
              />
            </div>
          </a>
        </Link>
        <Link href={`/details?category=${data[2].category}&id=${data[2].id}`}>
          <a className='last-item'>
            <h3>{data[2].headline}</h3>
            <p className='text-justify'>{data[2].body.slice(0, 200)}...</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PoliticsBusiness;
