/* eslint-disable @next/next/no-img-element */
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import FooterModal from "../../../components/admin/menu/FooterModal";
import useStore from "../../../components/context/useStore";
import { axios } from "../../../services/client/common";

const FooterMenu = () => {
  const [update, setUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState("");
  const [menus, setMenus] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("/api/menus/footermenus", {
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

  async function deleteFooterMenu(collumn, name) {
    try {
      const result = await axios("/api/menus/footermenus", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ collumn, name, userId: store?.user?.uid }),
      });
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }

  return (
    <AdminLayout>
      <div className='mx-5'>
        <h3 className='text-center my-5'>Footer Menus</h3>
        <div className='dashboard-footer-menu-wrapper'>
          <div className='item relative'>
            <header>
              <p>NEWS</p>
              <button onClick={() => setShowAdd("NEWS")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.news.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu.name}</p>
                  <button
                    onClick={() => deleteFooterMenu(1, menu.name)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

            {showAdd === "NEWS" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                title='NEWS'
                collumn={1}
              />
            )}
          </div>

          <div className='item relative'>
            <header>
              <p>OPINION</p>
              <button onClick={() => setShowAdd("OPINION")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.opinion.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu.name}</p>
                  <button
                    onClick={() => deleteFooterMenu(2, menu.name)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            {showAdd === "OPINION" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                collumn={2}
                title='OPINION'
              />
            )}
          </div>

          <div className='item relative'>
            <header>
              <p>ARTS</p>
              <button onClick={() => setShowAdd("ARTS")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.arts.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu.name}</p>
                  <button
                    onClick={() => deleteFooterMenu(3, menu.name)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            {showAdd === "ARTS" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                collumn={3}
                title='ARTS'
              />
            )}
          </div>

          <div className='item relative'>
            <header>
              <p>LIVING</p>
              <button onClick={() => setShowAdd("LIVING")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.living.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu.name}</p>
                  <button
                    onClick={() => deleteFooterMenu(4, menu.name)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            {showAdd === "LIVING" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                collumn={4}
                title='LIVING'
              />
            )}
          </div>

          <div className='item relative'>
            <header>
              <p>MORE</p>
              <button onClick={() => setShowAdd("MORE")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.more.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu.name}</p>
                  <button
                    onClick={() => deleteFooterMenu(5, menu.name)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            {showAdd === "MORE" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                collumn={5}
                title='MORE'
              />
            )}
          </div>

          <div className='item relative'>
            <header>
              <p>Social Links</p>
              <button onClick={() => setShowAdd("social")} className='add-btn'>
                <FontAwesomeIcon icon={faAdd} />
              </button>
            </header>
            {menus &&
              menus.social.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <div>
                    <p className='text-left'>{menu.name.split(".")[1]}:</p>
                    <p>
                      <small>{menu.name}</small>
                    </p>
                  </div>
                  <button
                    onClick={() => deleteSocialLink(menu)}
                    className='w-5'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            {showAdd === "social" && (
              <FooterModal
                setUpdate={setUpdate}
                close={setShowAdd}
                collumn={6}
                title='Social Links'
              />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FooterMenu;
