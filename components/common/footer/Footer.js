/* eslint-disable @next/next/no-img-element */
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        const res = await fetch("/api/menus/footermenus", {
          signal,
        });
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
              {store?.siteInfo?.logo && (
                <img
                  className='object-contain h-12'
                  src={`/${store?.siteInfo?.logo}`}
                  alt='logo'
                />
              )}
            </a>
          </Link>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-6 gap-5'>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>NEWS</p>
            {menus &&
              menus.news.map((menu, i) => (
                <Link href={`/category?search=${menu.name}`} key={i}>
                  <a>{menu.name}</a>
                </Link>
              ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>OPINION</p>
            {menus &&
              menus.opinion.map((menu, i) => (
                <Link href={`/category?search=${menu.name}`} key={i}>
                  <a>{menu.name}</a>
                </Link>
              ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>ARTS</p>
            {menus &&
              menus.arts.map((menu, i) => (
                <Link href={`/category?search=${menu.name}`} key={i}>
                  <a>{menu.name}</a>
                </Link>
              ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>LIVING</p>
            {menus &&
              menus.living.map((menu, i) => (
                <Link href={`/category?search=${menu.name}`} key={i}>
                  <a>{menu.name}</a>
                </Link>
              ))}
          </div>
          <div className='flex flex-col items-start'>
            <p className='font-medium'>MORE</p>
            {menus &&
              menus.more.map((menu, i) => (
                <Link href={`/category?search=${menu.name}`} key={i}>
                  <a>{menu.name}</a>
                </Link>
              ))}
          </div>

          <div className='flex flex-col items-start'>
            <p className='font-medium'>Social Link</p>
            <div className='text-2xl flex gap-4 flex-wrap mt-2'>
              {menus &&
                menus.social.map((item, i) => {
                  const icon = item.name.split(".")[1];
                  return (
                    <a
                      key={i}
                      href={item.name}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon
                        className='text-blue-400'
                        icon={
                          icon === "facebook"
                            ? faFacebook
                            : icon === "youtube"
                            ? faYoutube
                            : icon === "instagram"
                            ? faInstagram
                            : icon === "linkedin"
                            ? faLinkedin
                            : ""
                        }
                      />
                    </a>
                  );
                })}
            </div>
          </div>
        </section>
        <div className='footer-bottom-menu'>
          <p>2022, Navieasoft ltd || All rigth reserved</p>
          {footerMenus.map((menu, i) => (
            <button key={i}>{menu.name}</button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
