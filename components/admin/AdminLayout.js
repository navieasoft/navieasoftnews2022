import React from "react";
import Footer from "./common/Footer";
import Header from "./common/header";
import SideBar from "./common/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className='bg-gray-100'>
      <Header />
      <SideBar />
      <div className='lg:pl-[250px] pl-5 pr-5 w-full'>{children}</div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
