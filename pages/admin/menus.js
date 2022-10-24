import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../components/admin/common/header";
import SideBar from "../../components/admin/common/SideBar";
import { mainMenus } from "../../services/client/menus";

const Menus = () => {
  const [showSub, setShowSub] = useState(-1);
  const menus = mainMenus();

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='dashboard-menus-container'>
          <div className='item'>
            <header>
              <p>Main menus</p>
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </header>
            <div className='menus-wrapper'>
              {menus.map((item, i) => (
                <div key={i}>
                  <div
                    onClick={() =>
                      setShowSub((prev) => {
                        if (prev === i) return -1;
                        else return i;
                      })
                    }
                    className='menu'
                  >
                    <p>{item.name}</p>
                    {item.subs && <FontAwesomeIcon icon={faAngleDown} />}
                  </div>
                  {item.subs && (
                    <div className={showSub === i ? "show-sub" : "hide-sub"}>
                      {item.subs.map((sub, i) => (
                        <p className='sub-menu' key={i}>
                          {sub}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='item'>
            <header>
              <p>Footer menus</p>
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
