import Link from "next/link";
import React from "react";

const SideMenu = () => {
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
    <div className='side-menu-container'>
      {menus.map((menu, i) => (
        <Link href={`/category?q=${menu.toLowerCase()}`} key={i}>
          <a>{menu}</a>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
