/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  faCircleQuestion,
  faFolderOpen,
  faListAlt,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAdd,
  faAngleDown,
  faBarsStaggered,
  faBroadcastTower,
  faClipboardList,
  faDashboard,
  faFileWord,
  faGear,
  faHandshakeAngle,
  faNewspaper,
  faPhone,
  faPlus,
  faRectangleAd,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import useStore from "../../context/useStore";
import Image from "next/image";

const SideBar = () => {
  const [highlight, setHighlight] = useState("");
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    setHighlight(router.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menus = [
    {
      id: 1,
      icon: faDashboard,
      txt: "Dashboard",
      url: "/admin",
      highlight: ["/admin"],
    },

    {
      id: 3,
      icon: faListAlt,
      txt: "Menus",
      url: "#",
      highlight: ["/admin/menus", "/admin/menus/footer"],
      subs: [
        {
          icon: faClipboardList,
          txt: "Category Menus",
          url: "/admin/menus",
        },
        {
          icon: faBarsStaggered,
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
      highlight: [
        "/admin/news/addnews",
        "/admin/news",
        "/admin/news/breakingnews",
      ],
      subs: [
        {
          icon: faPlus,
          txt: "Add News",
          url: "/admin/news/addnews",
        },
        {
          icon: faNewspaper,
          txt: "Breaking News",
          url: "/admin/news/breakingnews",
        },
        {
          icon: faFolderOpen,
          txt: "All News",
          url: "/admin/news",
        },
      ],
    },
    {
      id: 5,
      icon: faUserAlt,
      txt: "Users",
      url: "#",
      highlight: ["/admin/users/adduser", "/admin/users"],
      subs: [
        { icon: faAdd, txt: "Add User", url: "/admin/users/adduser" },
        { icon: faUser, txt: "All User", url: "/admin/users" },
      ],
    },
    {
      id: 6,
      icon: faGear,
      txt: "Settings",
      url: "#",
      highlight: ["/admin/settings", "/admin/settings/advertising"],
      subs: [
        {
          icon: faCircleQuestion,
          txt: "Site Info",
          url: "/admin/settings",
        },
        {
          icon: faRectangleAd,
          txt: "Advertising",
          url: "/admin/settings/advertising",
        },
      ],
    },
    {
      id: 7,
      icon: faHandshakeAngle,
      txt: "Help",
      url: "#",
      highlight: [],
      subs: [
        {
          icon: faPhone,
          txt: "+8801636312933",
          url: "#",
        },
      ],
    },
  ];

  return (
    <div
      className={`side-bar-wrapper lg:block ${
        store.showSideBar ? "block" : "hidden"
      }`}
    >
      <div className='py-3 border-t flex justify-center items-center gap-4'>
        {store?.user && (
          <>
            {store?.user?.profile && (
              <Image
                height={40}
                width={40}
                className='rounded-full h-10 w-10 object-cover'
                src={store?.user?.profile}
                alt=''
              />
            )}
            <div className=''>
              <p>{store?.user?.name}</p>
              <p>Admin</p>
            </div>
          </>
        )}
      </div>
      {menus.map((item) => (
        <div
          className={`collapse ${
            item.highlight.includes(highlight) ? "collapse-open" : ""
          }`}
          key={item.id}
        >
          <input
            onClick={() => {
              router.push(item.url);
              if (!item.subs?.length) setHighlight(item.highlight[0]);
            }}
            type='checkbox'
          />
          <a
            className={`main-side-menu collapse-title ${
              item.highlight.includes(highlight) ? "highlight" : ""
            }`}
          >
            <div>
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.txt}</span>
            </div>
            {item.subs ? <FontAwesomeIcon icon={faAngleDown} /> : null}
          </a>
          {item.subs ? (
            <div className='collapse-content'>
              {item.subs.map((sub, i) => (
                <Link key={i} href={sub.url}>
                  <a
                    onClick={() => {
                      setHighlight(item.highlight[i]);
                    }}
                    className={`sub-side-menu ${
                      router.pathname === sub.url
                        ? "text-green-400"
                        : "text-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon icon={sub.icon} />
                    <span>{sub.txt}</span>
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
