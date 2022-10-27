import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { category } from "../../services/client/menus";
import useStore from "../context/useStore";

const TopMenus = () => {
  const [showSub, setShowSub] = useState(-1);
  const [menus, setMenus] = useState(null);
  const container = useRef(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menus", { signal });
        const result = await res.json();
        setMenus(result);
      } catch (error) {
        store.setError(true);
      }
    })();

    function hideDropdown(e) {
      if (!container.current?.contains(e.target)) {
        setShowSub(-1);
      }
    }
    window.addEventListener("click", (e) => hideDropdown(e));
    return () => {
      window.removeEventListener("click", hideDropdown);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={container} className='header-main-menus'>
      {menus &&
        menus.map((menu, i) => (
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
