import React from "react";

const ScrollingHighlight = () => {
  return (
    <div className='bg-white border-b py-2 px-5 lg:px-10 print:hidden'>
      <marquee>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          labore quaerat omnis cum quod maiores aspernatur soluta voluptas
          veniam veritatis modi, voluptatibus nulla autem eaque, quis ipsum?
          Officiis, quidem eos.
        </p>
      </marquee>
    </div>
  );
};

export default ScrollingHighlight;
