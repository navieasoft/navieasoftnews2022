/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import {
  faAngleDown,
  faBars,
  faClockRotateLeft,
  faGear,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import useStore from "../context/useStore";
import Link from "next/link";

const TopPart = ({ page }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuContainer = useRef(null);
  const router = useRouter();
  const container = useRef();
  const store = useStore();
  const country = [
    { name: "International", link: "/category?q=world" },
    { name: "Asia", link: "/category?q=world&sub=asia" },
    { name: "Bangladesh", link: "/category?q=bangladesh" },
  ];

  function singOut() {
    store.setUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    function hideUserMenu(e) {
      if (userMenuContainer) {
        if (userMenuContainer.current) {
          if (!userMenuContainer.current?.contains(e.target)) {
            setShowUserMenu(false);
          }
        }
      }
    }
    window.addEventListener("click", (e) => hideUserMenu(e));
    return () => {
      window.removeEventListener("click", hideUserMenu);
    };
  }, []);

  return (
    <div ref={container} className='header-top-part'>
      <div className='space-x-3 text-xl'>
        <button onClick={() => store?.setShowSideMenu((prev) => !prev)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {page === "home" ? (
        <div className='hidden md:flex justify-center gap-3'>
          {country.map((c, i) => (
            <Link href={c.link} key={i}>
              <a>{c.name}</a>
            </Link>
          ))}
        </div>
      ) : (
        <div className='hidden md:flex justify-center'>
          <div onClick={() => router.push("/")} className='cursor-pointer '>
            {store?.siteInfo?.logo && (
              <img
                className='cursor-pointer object-contain h-10'
                src={`/${store?.siteInfo?.logo}`}
                alt='logo'
              />
            )}
          </div>
        </div>
      )}

      <div className='flex justify-center md:hidden'>
        <div onClick={() => router.push("/")} className='cursor-pointer '>
          {store?.siteInfo?.logo && (
            <img
              className='cursor-pointer object-contain'
              src={`/${store?.siteInfo?.logo}`}
              alt='logo'
            />
          )}
        </div>
      </div>

      <div className='space-x-3 flex justify-end items-center'>
        <button className='custom-btn hidden md:block'>Subscribe now</button>
        {store?.user ? (
          <div
            ref={userMenuContainer}
            onClick={() => setShowUserMenu((prev) => !prev)}
            className='cursor-pointer relative'
          >
            {store.user.profile ? (
              <Image
                height={40}
                width={40}
                className='rounded-full h-10 w-10 object-cover'
                src={"/" + store?.user.profile}
                alt='user image'
              />
            ) : (
              <p>{store.user.name}</p>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className={`user-wrapper ${showUserMenu ? "block" : "hidden"}`}
            >
              <Link href='/user/history'>
                <button>
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                  <span>History</span>
                </button>
              </Link>
              <Link href='/user'>
                <button>
                  <FontAwesomeIcon icon={faGear} />
                  <span>Settings</span>
                </button>
              </Link>
              <button onClick={singOut}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => store?.setShowLoginRegister(true)}>
            <a className='space-x-1'>
              <span>Account</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopPart;
