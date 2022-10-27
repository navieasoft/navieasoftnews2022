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
            <Image
              className='rounded-full'
              width={30}
              height={30}
              src={store?.user?.photoURL}
              alt=''
            />
            <p>{store?.user?.displayName}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
