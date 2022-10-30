/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStore from "../../context/useStore";
import Divider from "../divider/Divider";

const Footer = () => {
  const [menus, setMenus] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(
          "https://newsportal-tau.vercel.app/api/menus/footermenus",
          {
            signal,
          }
        );
        const result = await res.json();
        setMenus(result);
      } catch (error) {
        store.setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const footerMenus = [
    "Contact Us",
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
              <img
                className='object-contain h-12'
                src={`/${store?.siteInfo?.logo}`}
                alt='logo'
              />
            </a>
          </Link>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-5 gap-5'>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>NEWS</p>
            {menus &&
              menus.NEWS.map((menu, i) => <button key={i}>{menu}</button>)}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>OPINION</p>
            {menus &&
              menus.OPINION.map((menu, i) => <button key={i}>{menu}</button>)}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>ARTS</p>
            {menus &&
              menus.ARTS.map((menu, i) => <button key={i}>{menu}</button>)}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>LIVING</p>
            {menus &&
              menus.LIVING.map((menu, i) => <button key={i}>{menu}</button>)}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>MORE</p>
            {menus &&
              menus.MORE.map((menu, i) => <button key={i}>{menu}</button>)}
          </div>
        </section>
        <div className='footer-bottom-menu'>
          <p>2022, Navieasoft ltd ||</p>
          {footerMenus.map((menu, i) => (
            <button key={i}>{menu}</button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
