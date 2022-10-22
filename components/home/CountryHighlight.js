import Image from "next/image";
import Link from "next/link";
import React from "react";

const CountryHighlight = () => {
  const data = [
    {
      _id: 1,
      img: "/dummy4.png",
      category: "country",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 2,
      img: "/dummy4.png",
      category: "country",
      heading: "The modern love Podcast",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 3,
      img: "/dummy4.png",
      category: "country",
      heading: "Listen to the 'This American Life'",
      body: " country highlight news sectionLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 4,
      img: "/dummy4.png",
      category: "country",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: 5,
      img: "/dummy4.png",
      category: "country",
      heading: "Listen to the 'This American Life'",
      body: "country highlight news section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className='country-highlight-container'>
      <Link href={`/details?category=${data[0].category}&id=${data[0]._id}`}>
        <a className='first-highlight'>
          <div>
            <h3 className='text-xl font-medium mb-3'>{data[0].heading}</h3>
            <p className='text-justify'>{data[0].body.slice(0, 300)}...</p>
          </div>
          <div className='lg:col-span-2 flex justify-center'>
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
      <div className='item'>
        {data.slice(1, data.length).map((item) => (
          <Link
            href={`/details?category=${item.category}&id=${item._id}`}
            key={item._id}
          >
            <a className='border-b py-4 px-4 hover:text-gray-500'>
              <h3 className='font-semibold text-xl'>{item.heading}</h3>
              <p className='text-justify'>{item.body.slice(0, 300)}...</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryHighlight;
