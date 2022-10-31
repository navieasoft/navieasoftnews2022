import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const Opinion = () => {
  return (
    <div className='mx-5 lg:mx-10 my-5 pb-3'>
      <p className='font-medium'>Opinion</p>
      <GaneralPattern title='opinion' isCategory={true} />
    </div>
  );
};

export default Opinion;
