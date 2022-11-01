/* eslint-disable @next/next/no-img-element */
import React from "react";

const SmallAdd = ({ picture, link }) => {
  return (
    <div className='advertise-slot cursor-pointer print:hidden'>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <img
          className='object-contain h-28 w-full'
          src={picture}
          alt='ad image'
        />
      </a>
    </div>
  );
};

export default SmallAdd;
