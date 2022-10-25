import {
  faAdd,
  faAngleDown,
  faClose,
  faEdit,
  faEllipsisVertical,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import MenuModal from "../../../components/admin/menu/menuModal";
import { mainMenus } from "../../../services/client/menus";

const MainMenus = () => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const [updateMenu, setUpdateMenu] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [showControl, setShowControl] = useState(-1);
  const [addSub, setAddSub] = useState(false);
  const Category = mainMenus();

  function handleDeleteSub(id) {
    const confirm = window.confirm("Are you sure to delete?");
    if (confirm) {
      console.log("deleted");
    }
  }
  function handleDeleteCategory(id) {
    const confirm = window.confirm("Are you sure to delete?");
    if (confirm) {
      console.log("deleted");
    }
  }

  function handleAddCategory(value) {}
  function handleAddSub(value) {}
  function handleEditCategory(value) {}

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='dashboard-main-menus-container'>
          <header>
            <p>Category menus</p>
            <button className='add-btn' onClick={() => setAddMenu(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </header>
          <div className='menus-wrapper'>
            {Category.map((item, i) => (
              <div className='collapse relative' key={i}>
                <input className='w-[90%]' type='checkbox' />
                <div className='collapse-title item'>
                  <p>{item.name}</p>

                  <div className='flex gap-3 items-center text-gray-500'>
                    {item.subs && <FontAwesomeIcon icon={faAngleDown} />}
                    <button
                      className='w-5'
                      onClick={() => {
                        if (showControl === i) setShowControl(-1);
                        else setShowControl(i);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </div>

                  <div
                    className={`control-wrapper ${
                      showControl === i ? "block" : "hidden"
                    }`}
                  >
                    <button onClick={() => handleDeleteCategory("id")}>
                      Delete
                    </button>
                    <button onClick={() => setUpdateMenu(true)}>Edit</button>
                    <button onClick={() => setAddSub((prev) => !prev)}>
                      Add Sub Category
                    </button>
                  </div>
                </div>
                {item.subs && (
                  <div className='collapse-content px-0 bg-slate-50'>
                    {item.subs.map((sub, i) => (
                      <div
                        onMouseEnter={() => setShowDeleteBtn(i)}
                        className='sub-menu'
                        key={i}
                      >
                        <p>{sub}</p>
                        <button
                          onClick={() => handleDeleteSub("id")}
                          className={`${
                            showDeleteBtn === i ? "block" : "hidden"
                          } text-gray-500`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <MenuModal
            action={handleAddCategory}
            closeModal={setAddMenu}
            openModal={addMenu}
            title='Add'
          />
          <MenuModal
            action={handleEditCategory}
            closeModal={setUpdateMenu}
            openModal={updateMenu}
            title='Edit'
          />
          <MenuModal
            action={handleAddSub}
            closeModal={setAddSub}
            openModal={addSub}
            title='Add Sub'
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenus;
