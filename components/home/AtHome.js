import Image from "next/image";
import Link from "next/link";
import React from "react";

const AtHome = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy7.png",
      category: "home",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy6.png",
      category: "home",
      heading: "The modern love Podcast",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy5.png",
      category: "home",
      heading: "Listen to the 'This American Life'",
      body: " country highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 4,
      img: "/dummy4.png",
      category: "home",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 5,
      img: "/dummy3.png",
      category: "home",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='px-5 lg:px-10 my-4'>
      <p>At Home</p>
      <div className='grid grid-cols-5 gap-5 mt-4'>
        {data.map((item) => (
          <Link
            href={`/details?category=${item.category}&id=${item._id}`}
            key={item._id}
          >
            <a className='flex flex-col link'>
              <Image
                className='object-cover object-center'
                width={200}
                height={100}
                src={item.img}
                alt=''
              />
              <p className='font-medium'>{item.heading}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AtHome;
