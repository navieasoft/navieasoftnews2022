/* eslint-disable @next/next/no-img-element */
import { passwordResetEmail } from "../../services/client/loginRegister";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breakingnews from "../../components/common/BreakingNews";
import MiddlePart from "../../components/common/MiddlePart";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../components/context/useStore";
import TopMenus from "../../components/common/TopMenus";
import { postImage } from "../../services/client/user";
import TopPart from "../../components/common/TopPart";
import { updateProfile } from "firebase/auth";
import Image from "next/image";

const User = () => {
  const [showMenus, setShowMenus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [highlight, setHlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const userMenuContainer = useRef(null);
  const name = useRef(null);
  const store = useStore();
  const profile = useRef(null);

  useEffect(() => {
    let unsub = false;
    if (!unsub) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) setHlight(true);
        else setHlight(false);
      });
    }
    return () => (unsub = true);
  }, []);

  useEffect(() => {
    function hideUserMenu(e) {
      if (userMenuContainer) {
        if (userMenuContainer.current) {
          if (!userMenuContainer.current?.contains(e.target)) {
            setShowMenus(false);
          }
        }
      }
    }
    window.addEventListener("click", (e) => hideUserMenu(e));
    return () => {
      window.removeEventListener("click", hideUserMenu);
    };
  }, []);

  async function updateUser(name, img) {
    try {
      await updateProfileImg(store?.user, {
        displayName: name,
        photoURL: img,
      });
      store?.setAlert({
        msg: "Updated successfully",
        type: "success",
      });
    } catch (error) {
      store?.setAlert({
        msg: "unable to updated",
        type: "error",
      });
    }
  }

  async function changeUserName(e) {
    e.preventDefault();
    setLoading(true);
    await updateUser(name.current?.value, null);
    setShowModal(false);
    setLoading(false);
  }

  async function updateProfileImg(file) {
    store.setLoading(true);
    try {
      const { error, image } = await postImage(file, store.user.photoURL);
      if (image) {
        await updateProfile(store?.user, {
          photoURL: `/${image}`,
        });
        store.setAlert({ msg: "update successfull", type: "success" });
      } else throw error;
    } catch (error) {
      store.setAlert({ msg: error.message, type: "error" });
    }

    store.setLoading(false);
  }

  return (
    <div>
      <div
        className={`sticky top-0 lg:static bg-white z-50 ${
          highlight ? "shadow" : ""
        }`}
      >
        <TopPart page='home' />
      </div>
      <MiddlePart />
      <TopMenus />
      <Breakingnews />

      <section className='user-page-container'>
        <Image
          width={128}
          height={128}
          className='rounded-full h-32 w-32 object-cover'
          src={store?.user?.photoURL || "/no-image.jpg"}
          alt='profile'
        />
        <div className='space-y-3'>
          <div>
            <b>Name:</b> <span>{store?.user?.displayName}</span>
          </div>
          <p>
            <b>Email:</b> {store?.user?.email}
          </p>
        </div>
        <div ref={userMenuContainer} className='edit-btn'>
          <button
            onClick={() => setShowMenus(true)}
            className='btn btn-primary'
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <div className={`edit-menus ${showMenus ? "block" : "hidden"}`}>
            <button
              onClick={() => {
                setShowMenus(false);
                setShowModal(true);
              }}
            >
              Name
            </button>
            <button onClick={() => profile.current?.click()}>Profile</button>
            <button
              onClick={() => {
                setShowMenus(false);
                passwordResetEmail(store?.user.email, store);
              }}
            >
              Password
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => changeUserName(e)}
          className={`user-modal ${showModal ? "flex" : "hidden"}`}
        >
          <p>
            <b>Change your name</b>
          </p>
          <input ref={name} required type='text' placeholder='Enter new name' />
          <button disabled={loading} className='btn btn-primary'>
            Change
          </button>
          <button
            onClick={() => setShowModal(false)}
            className='close-btn'
            type='button'
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </form>
      </section>

      <input
        onChange={(e) => updateProfileImg(e.target.files[0])}
        ref={profile}
        hidden
        type='file'
      />
    </div>
  );
};

export default User;
