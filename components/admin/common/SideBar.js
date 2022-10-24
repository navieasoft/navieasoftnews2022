import React, { useState } from "react";
import {
  faCircleQuestion,
  faFolderOpen,
  faListAlt,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAdd,
  faAngleDown,
  faDashboard,
  faFileWord,
  faGear,
  faNewspaper,
  faRectangleAd,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SideBar = () => {
  const [highlight, setHighlight] = useState(1);

  const menus = [
    { id: 1, icon: faDashboard, txt: "Dashboard", url: "/admin" },

    { id: 2, icon: faNewspaper, txt: "Headline", url: "/admin/headline" },
    {
      id: 3,
      icon: faListAlt,
      txt: "Menus",
      url: "#",
      subs: [
        { icon: faListAlt, txt: "Main Menus", url: "/admin/menus/main" },
        {
          icon: faListAlt,
          txt: "Footer Menus",
          url: "/admin/menus/footer",
        },
      ],
    },
    {
      id: 4,
      icon: faFileWord,
      txt: "News",
      url: "#",
      subs: [
        {
          icon: faFileWord,
          txt: "Add News",
          url: "/admin/news/addnews",
        },
        {
          icon: faFolderOpen,
          txt: "All News",
          url: "allnews",
          url: "/admin/news/allnews",
        },
      ],
    },
    {
      id: 5,
      icon: faUserAlt,
      txt: "Users",
      url: "#",
      subs: [
        { icon: faAdd, txt: "Add User", url: "/admin/users/adduser" },
        { icon: faUser, txt: "All User", url: "/admin/users/alluser" },
      ],
    },
    {
      id: 6,
      icon: faGear,
      txt: "Settings",
      url: "#",
      subs: [
        {
          icon: faCircleQuestion,
          txt: "Site Info",
          url: "/admin/settings/siteinfo",
        },
        {
          icon: faRectangleAd,
          txt: "Advertising",
          url: "/admin/settings/advertising",
        },
      ],
    },
  ];

  return (
    <div className='side-bar-container'>
      <div className='side-bar-wrapper'>
        {menus.map((item) => (
          <div key={item.id}>
            <Link href={item.url}>
              <a
                onClick={() => setHighlight(item.id)}
                className={`main-side-menu ${
                  highlight === item.id ? "highlight" : ""
                }`}
              >
                <div>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.txt}</span>
                </div>
                {item.subs && <FontAwesomeIcon icon={faAngleDown} />}
              </a>
            </Link>
            {item.subs && (
              <div className={highlight === item.id ? "show-sub" : "hide-sub"}>
                {item.subs.map((sub, i) => (
                  <Link key={i} href={sub.url}>
                    <a className='sub-side-menu'>
                      <FontAwesomeIcon icon={sub.icon} />
                      <span>{sub.txt}</span>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
