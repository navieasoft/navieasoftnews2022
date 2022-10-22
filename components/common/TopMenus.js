import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const TopMenus = () => {
  const [showSub, setShowSub] = useState(-1);
  const container = useRef(null);

  useEffect(() => {
    function hideDropdown(e) {
      // if(container.current.con)
    }
    window.addEventListener("click", (e) => hideDropdown(e));
  }, []);

  const menus = [
    {
      name: "World",
      subs: [
        "Asia",
        "Europe",
        "Noth Amerika",
        "South Amerika",
        "Afrika",
        "Australia",
      ],
    },
    {
      name: "US",
      subs: ["Alaska", "Arizona", "Arkansas", "California", "Colorado"],
    },
    { name: "Politics", subs: ["International", "Bangladesh"] },
    { name: "N.Y" },
    { name: "Business" },
    { name: "Tech" },
    { name: "Science" },
    { name: "Health" },
    { name: "Sports" },
    { name: "Arts" },
    { name: "Books" },
    { name: "Style" },
    { name: "Food" },
    { name: "Travel" },
    { name: "Magazine", subs: ["Science", "Technology", "Story", "History"] },
    { name: "Real EState" },
  ];
  return (
    <div ref={container} className='header-main-menus'>
      {menus.map((menu, i) => (
        <div
          onMouseEnter={() => setShowSub(i)}
          className='main-menu-wrapper'
          key={i}
        >
          <Link href={`/category?q=${menu.name}`}>
            <a className='main-menu'>
              <span>{menu.name}</span>
              {menu.subs && (
                <div>
                  {showSub === i ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </div>
              )}
            </a>
          </Link>
          {menu.subs && (
            <div
              onMouseLeave={() => setShowSub(false)}
              className={`sub-container ${
                showSub === i
                  ? `grid grid-cols-${Math.ceil(menu.subs.length / 5)}`
                  : "hidden"
              }`}
            >
              {menu.subs.map((sub) => (
                <Link href={`/category?q=${menu.name}&sub=${sub}`} key={sub}>
                  <a>{sub}</a>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopMenus;
