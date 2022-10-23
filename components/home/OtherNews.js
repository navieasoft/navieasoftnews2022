import Image from "next/image";
import Link from "next/link";
import React from "react";

const OtherNews = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life' Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy6.png",
      heading: "The modern love Podcast Listen to the 'This American Life'",
      body: "Lorem2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 4,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 5,
      img: "/dummy6.png",
      heading: "The modern love Podcast Listen to the 'This American Life'",
      body: "Lorem5 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 6,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem6 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 7,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem 7ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 8,
      img: "/dummy6.png",
      heading:
        "Listen to the 'This American Life' Listen to the 'This American Life'",
      body: "Lorem 7ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='mx-5 lg:mx-10 mt-3 border-b'>
      <p>In Other News</p>
      <div className='other-news-container'>
        <div className='col-span-2 lg:col-span-1 border-b md:border-b-0 pb-3 md:pb-0'>
          <Link
            href={`/details?category=${data[0].category}&id=${data[0]._id}`}
          >
            <a className='flex flex-col gap-3 link'>
              <Image
                className='object-cover object-center'
                height={200}
                width={200}
                src={data[0].img}
                alt=''
              />
              <h3>{data[0].heading}</h3>
              <p>{data[0].body.slice(0, 350)}...</p>
            </a>
          </Link>
        </div>

        <div className='space-y-2 md:border-r md:pr-3 lg:border-r-0 lg:pr-0 mt-3 md:mt-0'>
          {data.slice(1, 4).map((item, i, arr) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a
                className={`link block ${
                  arr.length - 1 !== i ? "border-b pb-2" : ""
                }`}
              >
                <h3>{item.heading}</h3>
                <p>{item.body.slice(0, 150)}...</p>
              </a>
            </Link>
          ))}
        </div>

        <div className='space-y-5 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0'>
          {data.slice(4, data.length).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='grid grid-cols-3 gap-4 items-center link'>
                <Image
                  className='object-cover object-center '
                  height={100}
                  width={100}
                  src={item.img}
                  alt=''
                />
                <p className='col-span-2 text-left font-medium text-lg'>
                  {item.heading}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherNews;
