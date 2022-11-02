/* eslint-disable @next/next/no-img-element */
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const DailyReportOfCountry = () => {
  const capitals = [
    "Tenn",
    "Calif",
    "Ariz",
    "Okla",
    "Ala",
    "Ark",
    "Ind",
    "Utah",
    "Kan",
  ];

  return (
    <section className='daily-report-container'>
      <section className='item'>
        <div>
          <b>
            United States <FontAwesomeIcon icon={faAngleRight} />
          </b>
          <p>On Dec, 25</p>
          <p>14-days, Change</p>
        </div>
        <div className='mt-1'>
          <p>New Cases</p>
          <b>12048</b>
          <b>
            -2% <FontAwesomeIcon icon={faArrowRight} />
          </b>
        </div>
        <div className='mt-1'>
          <p>New Deaths</p>
          <b>12048</b>
          <b>
            +3% <FontAwesomeIcon icon={faArrowRight} />
          </b>
        </div>
      </section>
      <section className='border-r pr-1 mr-1 hidden lg:block'>
        <p>
          Where cases per capital are <b>highest</b>
        </p>
        <div className='grid grid-cols-3 gap-y-1 text-center'>
          {capitals.map((c, i) => (
            <div key={i}>
              <p className='space-x-3'>
                <FontAwesomeIcon icon={faArrowRight} />
                <span>{c}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className='hidden lg:block'>
        <div className='flex justify-between gap-4'>
          <p className='space-x-3'>
            <span>U.S hot sport</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </p>
          <p className='space-x-3'>
            <span>Worldwide</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </p>
        </div>
        <div className='flex justify-center items-center mt-2'>
          <img width={200} height={100} src='/dummy2.png' alt='' />
        </div>
      </section>
    </section>
  );
};

export default DailyReportOfCountry;
