/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Markup } from "interweave";

const PoliticsBusiness = ({ data }) => {
  return (
    <div className='mt-4 politics-business-highligh'>
      <Link href={`/details?id=${data[0].id}`}>
        <a className='first-item'>
          <div>
            <h3 className='text-xl font-medium mb-3'>{data[0].headline}</h3>
            <Markup
              className='text-justify'
              content={`${data[0]?.body.slice(0, 300)}...`}
            />
          </div>
          <div className='lg:col-span-2 flex justify-center lg:justify-end'>
            <img
              className='object-cover object-top h-64 w-full'
              src={`/assets/${data[0].image}`}
              alt='news image'
            />
          </div>
        </a>
      </Link>
      <div className='md:grid grid-cols-2 lg:grid-cols-3 py-3'>
        <Link href={`/details?id=${data[1].id}`}>
          <a className='second-item'>
            <div className='col-span-2'>
              <h3 className='text-xl font-medium mb-3'>{data[1].headline}</h3>
              <Markup
                className='text-justify'
                content={`${data[1]?.body.slice(0, 300)}...`}
              />
            </div>
            <div className='hidden lg:flex justify-center'>
              <img
                className='object-cover object-center h-full w-full'
                src={`/assets/${data[1].image}`}
                alt='news image'
              />
            </div>
          </a>
        </Link>
        <Link href={`/details?id=${data[2].id}`}>
          <a className='last-item'>
            <h3>{data[2].headline}</h3>
            <Markup
              className='text-justify'
              content={`${data[2]?.body.slice(0, 200)}...`}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PoliticsBusiness;
