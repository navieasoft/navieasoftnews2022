import Image from "next/image";
import Link from "next/link";
import React from "react";

const GaneralPattern = ({ data, isCategory }) => {
  return (
    <div className='md:grid grid-cols-3 xl:grid-cols-5 mt-3 gap-5'>
      {data.map((item) => (
        <Link
          href={`/details?category=${item.category}&id=${item._id}`}
          key={item._id}
        >
          <a className='flex flex-col gap-y-2 hover:text-gray-500 py-4 border-t md:border-t-0'>
            {isCategory && <p className='font-medium'>{item.category}</p>}
            <Image
              className='object-cover object-top'
              width={200}
              height={150}
              src={item.img}
              alt='image'
            />
            <h3>{item.heading}</h3>
            <p className='text-justify'>{item.body.slice(0, 200)}...</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default GaneralPattern;
