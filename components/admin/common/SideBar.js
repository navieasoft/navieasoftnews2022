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
  faClipboardList,
  faDashboard,
  faFileWord,
  faGear,
  faNewspaper,
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
      highlight: ["/admin/menus/category", "/admin/menus/footer"],
      subs: [
        {
          icon: faClipboardList,
          txt: "Category Menus",
          url: "/admin/menus/category",
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
  ];

  return (
    <div
      className={`side-bar-container lg:block ${
        store.showSideBar ? "block" : "hidden"
      }`}
    >
      <div className='side-bar-wrapper'>
        <div className='py-3 border-t flex justify-center items-center gap-4'>
          {store?.user && (
            <>
              <Image
                className='rounded-full'
                width={40}
                height={40}
                src={store?.user?.photoURL}
                alt=''
              />
              <div className=''>
                <p>{store?.user?.displayName}</p>
                <p>Admin</p>
              </div>
            </>
          )}
        </div>
        {menus.map((item) => (
          <div className='collapse' key={item.id}>
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
              {item.subs && <FontAwesomeIcon icon={faAngleDown} />}
            </a>
            {item.subs && (
              <div className='collapse-content px-0'>
                {item.subs.map((sub, i) => (
                  <Link key={i} href={sub.url}>
                    <a
                      onClick={() => {
                        setHighlight(item.highlight[i]);
                      }}
                      className='sub-side-menu'
                    >
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
