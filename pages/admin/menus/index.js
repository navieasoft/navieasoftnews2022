import {
  faAngleDown,
  faEllipsisVertical,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import MenuModal from "../../../components/admin/menu/menuModal";
import useStore from "../../../components/context/useStore";
import {
  handleAddCategory,
  handleAddSub,
  handleDeleteCategory,
  handleDeleteSub,
  handleEditCategory,
} from "../../../services/client/menus";

const MainMenus = () => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const [updateMenu, setUpdateMenu] = useState(false);
  const [showCollaps, setShowCollaps] = useState(-1);
  const [showControl, setShowControl] = useState(-1);
  const [categoryId, setCategoryId] = useState("");
  const [addMenu, setAddMenu] = useState(false);
  const [addSub, setAddSub] = useState(false);
  const [update, setUpdate] = useState(false);
  const [menus, setMenus] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menus", {
          signal,
        });
        const result = await res.json();
        setMenus(result);
      } catch (error) {
        store.setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <AdminLayout>
      <div className='dashboard-main-menus-container'>
        <header>
          <p>Category menus</p>
          <button className='add-btn' onClick={() => setAddMenu(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header>
        <div className='menus-wrapper'>
          {menus &&
            menus.map((item, index) => (
              <div
                onClick={() => setShowControl(-1)}
                className='relative'
                key={item._id}
              >
                <div className=' item'>
                  <p>{item.name}</p>

                  <div className='flex gap-3 items-center text-gray-500'>
                    {item.subs && (
                      <button
                        onClick={() =>
                          setShowCollaps((prev) => {
                            if (prev === index) return -1;
                            else return index;
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faAngleDown} />
                      </button>
                    )}
                    <button
                      className='w-5'
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowControl(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </div>

                  <div
                    className={`control-wrapper ${
                      showControl === index ? "block" : "hidden"
                    }`}
                  >
                    <button
                      onClick={() =>
                        handleDeleteCategory(item._id, store, setUpdate)
                      }
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setCategoryId(item._id);
                        setUpdateMenu(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCategoryId(item._id);
                        setAddSub((prev) => !prev);
                      }}
                    >
                      Add Sub Category
                    </button>
                  </div>
                </div>
                {item.subs && (
                  <div
                    className={`accordion ${
                      showCollaps === index ? "show" : ""
                    }`}
                  >
                    {item.subs.map((sub, i) => (
                      <div
                        onMouseEnter={() => setShowDeleteBtn(i)}
                        className='sub-menu'
                        key={i}
                      >
                        <p>{sub}</p>
                        <button
                          onClick={() =>
                            handleDeleteSub(item._id, sub, store, setUpdate)
                          }
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
          setUpdate={setUpdate}
          openModal={addMenu}
          title='Add'
        />
        <MenuModal
          action={handleEditCategory}
          closeModal={setUpdateMenu}
          categoryId={categoryId}
          openModal={updateMenu}
          setUpdate={setUpdate}
          title='Edit'
        />
        <MenuModal
          categoryId={categoryId}
          closeModal={setAddSub}
          setUpdate={setUpdate}
          action={handleAddSub}
          openModal={addSub}
          title='Add Sub'
        />
      </div>
    </AdminLayout>
  );
};

export default MainMenus;
