import Image from "next/image";
import Link from "next/link";
import React from "react";

const Features = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy7.png",
      category: "features",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy6.png",
      category: "features",
      heading: "The modern love Podcast",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy5.png",
      category: "features",
      heading: "Listen to the 'This American Life'",
      body: " country highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 4,
      img: "/dummy4.png",
      category: "features",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 5,
      img: "/dummy3.png",
      category: "features",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='mx-5 lg:mx-10 py-4 border-b'>
      <p>Features</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4'>
        <Link href={`/details?category=${data[0].category}&id=${data[0]._id}`}>
          <a className='flex flex-col gap-3 text-center link'>
            <Image
              className='object-contain'
              height={300}
              width={300}
              src={data[0].img}
              alt=''
            />
            <h3>{data[0].heading}</h3>
            <p className='text-justify'>
              {data[0].body.slice(0, 700)} {data[0].body.length > 700 && "..."}
            </p>
          </a>
        </Link>

        <div className='space-y-3 grid grid-cols-2 gap-x-6 gap-y-2 link'>
          {data.slice(1, data.length).map((item) => (
            <Link
              href={`/details?category=${item.category}&id=${item._id}`}
              key={item._id}
            >
              <a className='flex flex-col'>
                <Image
                  className='object-cover object-center'
                  width={200}
                  height={150}
                  src={item.img}
                  alt='image'
                />
                <h3>{item.heading}</h3>
                <p className='text-justify'>{item.body.slice(0, 100)}...</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
