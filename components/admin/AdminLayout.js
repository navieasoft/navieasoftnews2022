import React from "react";
import Footer from "./common/Footer";
import Header from "./common/header";
import SideBar from "./common/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className='bg-gray-100'>
      <Header />
      <SideBar />
      <div className='pl-[250px] pr-5 w-full'>{children}</div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
