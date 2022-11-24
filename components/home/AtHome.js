/* eslint-disable @next/next/no-img-element */
import carusalSetting from "../../services/client/carusalSetting";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import React from "react";

const AtHome = ({ data }) => {
  if (!data) return null;
  return (
    <div className='px-5 lg:px-10 my-4'>
      <p className='mb-3'>At Home</p>
      <Carousel
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={10000}
        transitionDuration={0}
        draggable
        responsive={carusalSetting}
      >
        {data.map((item) => (
          <Link href={`/details?id=${item.id}`} key={item.id}>
            <a className='flex flex-col hover:text-gray-500 mx-3'>
              <img
                className='object-cover object-center'
                src={`assets/${item.image}`}
                alt=''
              />
              <p className='font-medium'>{item.headline}</p>
            </a>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default AtHome;
