/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ScienceTechnology = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          "http://localhost:3000/api/news/home?category=Science%20&%20Technology&limit=5"
        );
        const result = await res.json();
        if (res.ok) {
          setNews(result);
        } else throw result;
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  if (!news) return null;
  return (
    <div className='mx-5 lg:mx-10 my-3'>
      <p>Science & Technology</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4'>
        <div className='md:grid grid-cols-2 gap-5 border-b pb-3 lg:border-b-0 lg:pb-0 space-y-4 md:space-y-0'>
          {news.slice(0, 2).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='flex flex-col gap-y-2 hover:text-gray-500'>
                <img
                  className='object-cover object-top'
                  src={`/assets/${item.mainImg}`}
                  alt='image'
                />
                <h3>{item.headline}</h3>
                <p className='text-justify'>{item.body.slice(0, 200)}...</p>
              </a>
            </Link>
          ))}
        </div>
        <div className='space-y-5'>
          {news.slice(2, 4).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='grid grid-cols-1 md:grid-cols-2 gap-5 hover:text-gray-500'>
                <div>
                  <h3>{item.headline}</h3>
                  <p className='text-justify'>{item.body.slice(0, 150)}...</p>
                </div>
                <img
                  className='object-cover object-top'
                  src={`/assets/${item.mainImg}`}
                  alt='image'
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceTechnology;
