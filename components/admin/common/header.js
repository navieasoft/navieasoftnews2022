/* eslint-disable @next/next/no-img-element */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useStore from "../../context/useStore";

const Header = () => {
  const store = useStore();

  return (
    <div className='dashboard-header'>
      <div className='flex gap-5'>
        <div
          onClick={() => store?.setShowSideBar((prev) => !prev)}
          className='text-lg lg:hidden'
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <Link href='/'>
          <a>
            <h3>{store?.siteInfo?.name || ""}</h3>
          </a>
        </Link>
      </div>
      <div className='flex gap-3'>
        {store?.user && (
          <>
            {store?.user?.photoURL && (
              <Image
                height={32}
                width={32}
                className='rounded-full h-8 w-8 object-cover'
                src={store?.user?.photoURL}
                alt=''
              />
            )}
            <p>{store?.user?.displayName}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
