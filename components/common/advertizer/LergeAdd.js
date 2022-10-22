import Image from "next/image";
import React from "react";

const LergeAdd = ({ picture, link }) => {
  return (
    <div className='advertise-slot print:hidden'>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <Image
          className='object-contain'
          width={800}
          height={100}
          src={picture}
          alt='ad image'
        />
      </a>
    </div>
  );
};

export default LergeAdd;
