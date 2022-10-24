import React, { useEffect, useRef, useState } from "react";
import {
  faAngleDown,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import SideMenu from "./SideMenu";
import { useRouter } from "next/router";
import useStore from "../context/useStore";
import { signOut } from "firebase/auth";
import { auth } from "../../services/client/firebase";

const TopPart = ({ page }) => {
  const [activeCountry, setActiveCountry] = useState("");
  const router = useRouter();
  const container = useRef();
  const store = useStore();

  const country = ["International", "Asia", "Bangladesh"];

  async function logOut() {
    try {
      await signOut(auth);
      store?.setUser(null);
      store?.setAlert({ msg: "Sing Out successful", type: "success" });
    } catch (error) {
      store?.setAlert({
        msg: "Somthing went wrong!, Try again",
        type: "error",
      });
    }
  }

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
        <div className='hidden md:flex justify-center'>
          <div className='space-x-3'>
            {country.map((c, i) => (
              <button
                className={
                  activeCountry === c ? "text-purple-500 font-medium" : ""
                }
                onClick={() => setActiveCountry(c)}
                key={i}
              >
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <div onClick={() => router.push("/")} className='cursor-pointer '>
            <Image
              className='cursor-pointer object-contain'
              width={200}
              height={30}
              src='/logo.png'
              alt='logo'
            />
          </div>
        </div>
      )}

      <div className='flex justify-center md:hidden'>
        <div onClick={() => router.push("/")} className='cursor-pointer '>
          <Image
            className='cursor-pointer object-contain'
            width={200}
            height={30}
            src='/logo.png'
            alt='logo'
          />
        </div>
      </div>

      <div className='space-x-3 flex justify-end'>
        <button className='custom-btn hidden lg:block'>Subscribe now</button>
        {store?.user ? (
          <div>
            <button onClick={logOut} className='py-1 px-3 rounded border'>
              Logout
            </button>
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
