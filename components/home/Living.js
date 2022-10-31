import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const Living = () => {
  return (
    <div className='mx-5 lg:mx-10 my-5 pb-3'>
      <p className='font-medium'>Living</p>
      <GaneralPattern title='living' isCategory={true} />
    </div>
  );
};

export default Living;
