import Image from "next/image";
import React from "react";

const SmallAdd = ({ picture, link }) => {
  return (
    <div className='advertise-slot cursor-pointer print:hidden'>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <Image
          className='object-contain'
          width={400}
          height={200}
          src={picture}
          alt='ad image'
        />
      </a>
    </div>
  );
};

export default SmallAdd;
