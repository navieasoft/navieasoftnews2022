import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const MiddlePart = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  const monthName = d.toLocaleString("en-us", { month: "long" });
  const date = d.getDate();
  const year = d.getFullYear();

  return (
    <div className='header-middle-part'>
      <div>
        <p className='font-medium'>
          {dayName}, {monthName} {date}, {year}
        </p>
        <p>Todays News</p>
      </div>
      <div className='hidden md:flex justify-center'>
        <Image
          className='object-contain'
          height={50}
          width={300}
          src='/logo.png'
          alt='logo'
        />
      </div>
      <div className='flex justify-end'>
        <div>
          <p className='space-x-3'>
            <span className='font-medium'>17&deg;</span>
            <small>26&deg; 13&deg;</small>
          </p>
          <p className='space-x-3'>
            <small>Dow</small>
            <small>
              +0.23% <FontAwesomeIcon icon={faArrowUp} />
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiddlePart;
