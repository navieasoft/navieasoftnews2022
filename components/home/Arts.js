import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const Arts = () => {
  return (
    <div className='mx-5 lg:mx-10 my-5 pb-3'>
      <p className='font-medium'>Arts</p>
      <GaneralPattern title='arts' isCategory={true} />
    </div>
  );
};

export default Arts;
