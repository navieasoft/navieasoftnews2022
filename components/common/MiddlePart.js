/* eslint-disable @next/next/no-img-element */
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useStore from "../context/useStore";

const MiddlePart = () => {
  const { siteInfo } = useStore();
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
        <img
          className='object-contain h-12'
          src={`/${siteInfo?.logo}`}
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
