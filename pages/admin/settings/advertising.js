import React from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const Advertising = () => {
  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5 overflow-auto'>
        <div className='w-[200px]'>
          <SideBar />
        </div>
        <div>Advertising</div>
      </div>
    </div>
  );
};

export default Advertising;
