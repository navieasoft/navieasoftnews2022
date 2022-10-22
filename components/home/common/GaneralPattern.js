import Image from "next/image";
import Link from "next/link";
import React from "react";

const GaneralPattern = ({ data, isCategory }) => {
  return (
    <div
      className={`grid grid-cols-3 lg:grid-cols-5 gap-y-10 mt-3 ${
        isCategory ? "gap-x-5" : "gap-x-3"
      }`}
    >
      {data.map((item, i, arr) => (
        <Link
          href={`/details?category=${item.category}&id=${item._id}`}
          key={item._id}
        >
          <a
            className={`flex flex-col gap-y-2 link ${
              !isCategory && arr.length - 1 !== i ? "border-r pr-3" : ""
            }`}
          >
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
