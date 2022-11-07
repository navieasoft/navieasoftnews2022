import {
  faAngleDown,
  faAngleUp,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import useStore from "../context/useStore";

const SideMenu = () => {
  const [showSub, setShowSub] = useState(-1);
  const store = useStore();

  return (
    <div
      className={`side-menu-container ${
        store.showSideMenu ? "showSidMenu" : "hideSideMenu"
      }`}
    >
      <div onClick={() => store.setShowSideMenu(false)} className='close-btn'>
        <FontAwesomeIcon icon={faClose} />
      </div>
      {store?.categoryMenu?.map((menu, i) => (
        <div key={i}>
          <div className='menus'>
            <Link href={`/category?q=${menu.name}`}>
              <a>{menu.name}</a>
            </Link>
            {menu.subs && (
              <div
                className='cursor-pointer'
                onClick={() =>
                  setShowSub((prev) => {
                    if (prev === i) return -1;
                    else return i;
                  })
                }
              >
                {showSub === i ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </div>
            )}
          </div>
          {menu.subs && (
            <div className={`accordion ${showSub === i ? "show" : ""}`}>
              {menu.subs.map((sub) => (
                <Link href={`/category?q=${menu.name}&sub=${sub}`} key={sub}>
                  <a className='sub-menus'>{sub}</a>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
