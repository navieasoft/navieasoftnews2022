import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import FooterModal from "../../../components/admin/menu/FooterModal";
import useStore from "../../../components/context/useStore";

const Footer = () => {
  const [update, setUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState("");
  const [menus, setMenus] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menus/footermenus", {
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

  async function deleteFooterMenu(title, value) {
    try {
      const res = await fetch("http://localhost:3000/api/menus/footermenus", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ title, value, userId: store?.user?.uid }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='w-full mx-5 lg:w-3/4 lg:mx-auto'>
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
                menus.NEWS.map((menu, i) => (
                  <div className='flex justify-between py-2 border-b' key={i}>
                    <p>{menu}</p>
                    <button
                      onClick={() => deleteFooterMenu("NEWS", menu)}
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
                />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>OPINION</p>
                <button
                  onClick={() => setShowAdd("OPINION")}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus &&
                menus.OPINION.map((menu, i) => (
                  <div className='flex justify-between py-2 border-b' key={i}>
                    <p>{menu}</p>
                    <button
                      onClick={() => deleteFooterMenu("OPINION", menu)}
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
                menus.ARTS.map((menu, i) => (
                  <div className='flex justify-between py-2 border-b' key={i}>
                    <p>{menu}</p>
                    <button
                      onClick={() => deleteFooterMenu("ARTS", menu)}
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
                  title='ARTS'
                />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>LIVING</p>
                <button
                  onClick={() => setShowAdd("LIVING")}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus &&
                menus.LIVING.map((menu, i) => (
                  <div className='flex justify-between py-2 border-b' key={i}>
                    <p>{menu}</p>
                    <button
                      onClick={() => deleteFooterMenu("LIVING", menu)}
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
                menus.MORE.map((menu, i) => (
                  <div className='flex justify-between py-2 border-b' key={i}>
                    <p>{menu}</p>
                    <button
                      onClick={() => deleteFooterMenu("MORE", menu)}
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
                  title='MORE'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
