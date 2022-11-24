import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const MostPopular = () => {
  return (
    <div className='mx-5 lg:mx-10 my-5 border-b pb-3'>
      <p>Most Popular</p>
      <GaneralPattern isCategory={false} title='popular' />
    </div>
  );
};

export default MostPopular;
