import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../context/useStore";

const TopMenus = () => {
  const [showSub, setShowSub] = useState(-1);
  const container = useRef(null);
  const { categoryMenu } = useStore();

  useEffect(() => {
    function hideDropdown(e) {
      if (!container.current?.contains(e.target)) {
        setShowSub(-1);
      }
    }
    window.addEventListener("click", (e) => hideDropdown(e));
    return () => {
      window.removeEventListener("click", hideDropdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={container} className='header-main-menus'>
      {categoryMenu &&
        categoryMenu.map((menu, i) => (
          <div
            onMouseEnter={() => setShowSub(i)}
            className='main-menu-wrapper'
            key={i}
          >
            <Link href={`/category?q=${menu.name}`}>
              <a className='main-menu'>
                <span>{menu.name}</span>
                {menu.subs?.length ? (
                  <div>
                    {showSub === i ? (
                      <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleDown} />
                    )}
                  </div>
                ) : null}
              </a>
            </Link>
            {menu.subs?.length ? (
              <div
                onMouseLeave={() => setShowSub(false)}
                className={`sub-container ${
                  showSub === i
                    ? `grid grid-cols-${Math.ceil(menu.subs.length / 5)}`
                    : "hidden"
                }`}
              >
                {menu.subs.map((sub) => (
                  <Link
                    href={`/category?q=${menu.name}&sub=${sub.name}`}
                    key={sub.id}
                  >
                    <a>{sub.name}</a>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default TopMenus;
