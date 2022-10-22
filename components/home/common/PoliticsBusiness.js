import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PoliticsBusiness = ({ data }) => {
  return (
    <div className='mt-4 politics-business-highligh'>
      <Link href={`/details?category=${data[0].category}&id=${data[0]._id}`}>
        <a className='first-item'>
          <div>
            <h3 className='text-xl font-medium mb-3'>{data[0].heading}</h3>
            <p className='text-justify'>{data[0].body.slice(0, 300)}...</p>
          </div>
          <div className='lg:col-span-2 flex justify-center lg:justify-end'>
            <Image
              className='object-cover object-top'
              width={500}
              height={250}
              src={data[0].img}
              alt='news image'
            />
          </div>
        </a>
      </Link>
      <div className='grid grid-cols-2 lg:grid-cols-3 py-3'>
        <Link href={`/details?category=${data[1].category}&id=${data[1]._id}`}>
          <a className='second-item'>
            <div className='col-span-2'>
              <h3 className='text-xl font-medium mb-3'>{data[1].heading}</h3>
              <p className='text-justify'>{data[1].body.slice(0, 300)}...</p>
            </div>
            <div className='hidden lg:flex justify-center'>
              <Image
                width={300}
                className='object-cover object-center'
                height={100}
                src={data[1].img}
                alt='news image'
              />
            </div>
          </a>
        </Link>
        <Link href={`/details?category=${data[2].category}&id=${data[2]._id}`}>
          <a className='last-item'>
            <h3>{data[2].heading}</h3>
            <p className='text-justify'>{data[2].body.slice(0, 200)}...</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PoliticsBusiness;
