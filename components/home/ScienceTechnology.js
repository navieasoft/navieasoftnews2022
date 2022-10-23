import Image from "next/image";
import Link from "next/link";
import React from "react";

const ScienceTechnology = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy7.png",
      category: "science&technology",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy6.png",
      category: "science&technology",
      heading: "The modern love Podcast modern",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy5.png",
      category: "science&technology",
      heading: "Listen to the 'This American Life'",
      body: " country highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 4,
      img: "/dummy4.png",
      category: "science&technology",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='mx-5 lg:mx-10 my-3'>
      <p>Science & Technology</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4'>
        <div className='md:grid grid-cols-2 gap-5 border-b pb-3 lg:border-b-0 lg:pb-0 space-y-4 md:space-y-0'>
          {data.slice(0, 2).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='flex flex-col gap-y-2 link'>
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
        <div className='space-y-5'>
          {data.slice(2, 4).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='grid grid-cols-1 md:grid-cols-2 gap-5 link'>
                <div>
                  <h3>{item.heading}</h3>
                  <p className='text-justify'>{item.body.slice(0, 150)}...</p>
                </div>
                <Image
                  className='object-cover object-top'
                  width={200}
                  height={150}
                  src={item.img}
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
