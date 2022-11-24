/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const TopHighlight = ({ data }) => {
  return (
    <div className='highlight-part'>
      {data &&
        data.map((item) => (
          <Link href={`/details?id=${item.id}`} key={item.id}>
            <a className='item'>
              <img
                className='object-contain h-20'
                src={`/assets/${item.image}`}
                alt='news image'
              />
              <div>
                <h3 className='font-medium mb-2'>{item.heading}</h3>
                <p>{item.body.slice(0, 200)}...</p>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default TopHighlight;
