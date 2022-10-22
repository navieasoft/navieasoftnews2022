import Image from "next/image";
import Link from "next/link";
import React from "react";
import Divider from "../divider/Divider";

const Footer = () => {
  const menus = {
    news: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    opinion: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    arts: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    living: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    more: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
  };
  const footerMenus = [
    "Contack Us",
    "Advertise",
    "Work with us",
    "Privacy Policy",
    "Terms and Condition",
    "Terms of sales",
    "Site map",
    "Help",
  ];

  return (
    <footer className='mt-5 print:hidden'>
      <Divider />
      <div className='mx-5 lg:mx-10 mt-2'>
        <div className='flex justify-start mb-5'>
          <Link href='/'>
            <a>
              <Image
                className='object-contain'
                height={50}
                width={400}
                src='/logo.png'
                alt='logo'
              />
            </a>
          </Link>
        </div>
        <section className='grid grid-cols-5 gap-5'>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>NEWS</p>
            {menus.news.map((menu, i) => (
              <button key={i}>{menu}</button>
            ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>OPINION</p>
            {menus.opinion.map((menu, i) => (
              <button key={i}>{menu}</button>
            ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>ARTS</p>
            {menus.arts.map((menu, i) => (
              <button key={i}>{menu}</button>
            ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>LIVING</p>
            {menus.living.map((menu, i) => (
              <button key={i}>{menu}</button>
            ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>MORE</p>
            {menus.more.map((menu, i) => (
              <button key={i}>{menu}</button>
            ))}
          </div>
        </section>
        <div className='footer-bottom-menu'>
          <p>2022, The new york times company</p>
          {footerMenus.map((menu, i) => (
            <button key={i}>{menu}</button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
