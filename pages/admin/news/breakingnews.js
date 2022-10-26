import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const Breakingnews = () => {
  const [showAdd, setShowAdd] = useState(false);
  const data = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
  ];

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='w-full mx-5 lg:w-3/4 lg:mx-auto'>
          <div className='breaking-news-container'>
            <h3 className='text-center my-2 underline underline-offset-8'>
              Currently Showing These News
            </h3>
            {data.map((item, i) => (
              <div className='flex justify-between px-5' key={i}>
                <p className='text-lg font-medium'>{item}</p>
                <button className='w-5'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
          <div className='flex justify-end mt-3'>
            <button
              onClick={() => setShowAdd((prev) => !prev)}
              className='btn btn-primary'
            >
              {showAdd ? "Close" : "Add Another"}
            </button>
          </div>
          <div className={`add-breaking-news ${showAdd ? "block" : "hidden"}`}>
            <h3>Add New Breaking News</h3>
            <textarea
              name='headline'
              onChange={(e) => setText(e.target.value)}
              placeholder='Type here...'
              cols='30'
              rows='3'
            />
            <div className='flex justify-center absolute top-2 right-3'>
              <button className='btn btn-primary'>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breakingnews;
