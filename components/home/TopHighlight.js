import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopHighlight = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy3.png",
      category: "highlight",
      heading: "Listen to the 'This American Life'",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy3.png",
      category: "highlight",
      heading: "The modern love Podcast",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy3.png",
      category: "highlight",
      heading: "Listen to the 'This American Life'",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='highlight-part'>
      {data.map((item) => (
        <Link
          href={`/details?category=${item.category}&id=${item._id}`}
          key={item._id}
        >
          <a className='item'>
            <Image
              className='object-contain'
              width={250}
              height={100}
              src={item.img}
              alt='news image'
            />
            <div>
              <h3 className='font-medium mb-2'>{item.heading}</h3>
              <p>{item.body.slice(0, 70)}...</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TopHighlight;
