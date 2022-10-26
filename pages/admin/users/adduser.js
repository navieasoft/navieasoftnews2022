import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const Adduser = () => {
  const [user, setUser] = useState({});

  function handleChange(e) {
    const name = e.target.name;
    if (e.target.type !== "file") {
      setUser((prev) => {
        return { ...prev, [name]: e.target.value };
      });
    } else {
      setUser((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5 overflow-auto'>
        <SideBar />
        <div className='add-user-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <h3>Add a user</h3>
            <input
              onChange={(e) => handleChange(e)}
              name='name'
              type='text'
              required
              placeholder='Enter the user name'
            />
            <input
              onChange={(e) => handleChange(e)}
              name='email'
              required
              type='email'
              placeholder='Enter the user email'
            />
            <input
              onChange={(e) => handleChange(e)}
              name='password'
              required
              type='password'
              placeholder='Give a password'
            />
            <input
              onChange={(e) => handleChange(e)}
              name='designation'
              required
              type='text'
              placeholder='Give a designation'
            />
            <input
              onChange={(e) => handleChange(e)}
              className='w-full'
              name='avater'
              type='file'
            />
            <button className='btn btn-primary'>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
