import React, { useState } from "react";
import Header from "../../components/admin/common/header";
import SideBar from "../../components/admin/common/SideBar";

const Headline = () => {
  const [text, setText] = useState(() => "");

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='headline-container'>
          <textarea
            name='headline'
            onChange={(e) => setText(e.target.value)}
            placeholder='Type here...'
            cols='30'
            rows='10'
          />
          <div className='flex justify-center absolute top-2 right-2'>
            <button className='btn btn-primary'>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headline;
