import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import FooterModal from "../../../components/admin/menu/FooterModal";

const Footer = () => {
  const [showAdd, setShowAdd] = useState({ category: "", id: "" });
  const menus = {
    news: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    opinion: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    arts: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    living: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
    more: [
      "Home Page",
      "World",
      "U.S",
      "Coronavirous",
      "Politics",
      "Election Results",
      "New York",
      "Business",
      "Tech",
      "Science",
    ],
  };

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <div className='w-3/4 mx-auto'>
          <h3 className='text-center my-5'>Footer Menus</h3>
          <div className='dashboard-footer-menu-wrapper'>
            <div className='item relative'>
              <header>
                <p>NEWS</p>
                <button
                  onClick={() => setShowAdd({ category: "NEWS", id: "" })}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus.news.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu}</p>
                  <button className='w-5'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              {showAdd.category === "NEWS" && (
                <FooterModal close={setShowAdd} title='NEWS' />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>OPINION</p>
                <button
                  onClick={() => setShowAdd({ category: "OPINION", id: "" })}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus.opinion.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu}</p>
                  <button className='w-5'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {showAdd.category === "OPINION" && (
                <FooterModal close={setShowAdd} title='OPINION' />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>ARTS</p>
                <button
                  onClick={() => setShowAdd({ category: "ARTS", id: "" })}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus.arts.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu}</p>
                  <button className='w-5'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {showAdd.category === "ARTS" && (
                <FooterModal close={setShowAdd} title='ARTS' />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>LIVING</p>
                <button
                  onClick={() => setShowAdd({ category: "LIVING", id: "" })}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus.living.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu}</p>
                  <button className='w-5'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {showAdd.category === "LIVING" && (
                <FooterModal close={setShowAdd} title='LIVING' />
              )}
            </div>

            <div className='item relative'>
              <header>
                <p>MORE</p>
                <button
                  onClick={() => setShowAdd({ category: "MORE", id: "" })}
                  className='add-btn'
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </header>
              {menus.more.map((menu, i) => (
                <div className='flex justify-between py-2 border-b' key={i}>
                  <p>{menu}</p>
                  <button className='w-5'>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {showAdd.category === "MORE" && (
                <FooterModal close={setShowAdd} title='MORE' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
