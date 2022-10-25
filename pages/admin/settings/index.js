import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const Siteinfo = () => {
  const [info, setInfo] = useState({
    name: "",
    logo: "",
    favicon: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    if (name !== "name") {
      setInfo((prev) => {
        return { ...prev, [name]: e.target.files };
      });
    } else {
      setInfo((prev) => {
        return { ...prev, [name]: e.target.value };
      });
    }
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='site-info-container'>
          <div className='item'>
            <p>Site name</p>
            <input
              className='font-medium'
              name='name'
              onChange={(e) => handleChange(e)}
              type='text'
              placeholder='Type here...'
            />
          </div>
          <div className='item'>
            <p>Logo of your site</p>
            <input type='file' name='logo' onChange={(e) => handleChange(e)} />
          </div>
          <div className='item'>
            <p>Favicon of your site</p>
            <input
              type='file'
              name='favicon'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='col-span-3 flex justify-end'>
            <button className='btn btn-primary'>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Siteinfo;
