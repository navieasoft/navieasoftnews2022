import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import useStore from "../context/useStore";

const SideMenu = () => {
  const store = useStore();
  const menus = [
    "World",
    "US",
    "Politics",
    "N.Y",
    "Business",
    "Opinion",
    "Tech",
    "Science",
    "Health",
    "Sports",
    "Arts",
    "Books",
    "Style",
    "Food",
    "Travel",
    "Magazine",
    "T Magazine",
    "Real EState",
    "Video",
  ];

  return (
    <div
      className={`side-menu-container ${
        store.showSideMenu ? "showSidMenu" : "hideSideMenu"
      }`}
    >
      <div onClick={() => store.setShowSideMenu(false)} className='close-btn'>
        <FontAwesomeIcon icon={faClose} />
      </div>
      {menus.map((menu, i) => (
        <Link href={`/category?q=${menu.toLowerCase()}`} key={i}>
          <a>{menu}</a>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
