import React from "react";
import GaneralPattern from "./common/GaneralPattern";

const News = () => {
  return (
    <div className='mx-5 lg:mx-10 my-5 pb-3'>
      <p className='font-medium'>News</p>
      <GaneralPattern title='genaral news' isCategory={true} />
    </div>
  );
};

export default News;
