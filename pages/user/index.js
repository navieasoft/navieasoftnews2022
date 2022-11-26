/* eslint-disable @next/next/no-img-element */
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breakingnews from "../../components/common/BreakingNews";
import MiddlePart from "../../components/common/MiddlePart";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../components/context/useStore";
import TopMenus from "../../components/common/TopMenus";
import TopPart from "../../components/common/TopPart";
import { axios } from "../../services/client/common";

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

  async function updateUser() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("id", store.user.id);
      formData.append("profile", profile.current.files[0]);
      if (profile.current.files[0]) {
        formData.append("exist", store.user.profile);
      }

      await axios("/api/user?profile=true", {
        method: "PUT",
        body: formData,
      });
      store?.setAlert({
        msg: "Updated successfully",
        type: "success",
      });
      setShowModal(false);
      store.setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({
        msg: "unable to updated",
        type: "error",
      });
    }
    setLoading(false);
  }

  async function ForgotPassword() {
    setLoading(true);
    try {
      const res = await fetch(`/api/login?forgotPassword=${store.user.email}`);
      const result = await res.json();
      if (res.ok) {
        store.setAlert({
          msg: result.message,
          type: "success",
        });
      } else throw result;
    } catch (error) {
      store.setAlert({
        msg: error.message,
        type: "error",
      });
    }
    setLoading(false);
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
        {store?.user?.profile && (
          <img
            className='rounded-full h-32 w-32 object-cover'
            src={"/" + store?.user?.profile}
            alt='profile'
          />
        )}
        <div className='space-y-3'>
          <div>
            <b>Name:</b> <span>{store?.user?.name}</span>
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
              disabled={loading}
              onClick={() => {
                setShowMenus(false);
                setShowModal(true);
              }}
            >
              Name
            </button>
            <button disabled={loading} onClick={() => profile.current?.click()}>
              Profile
            </button>
            <button
              disabled={loading}
              onClick={() => {
                setShowMenus(false);
                ForgotPassword();
              }}
            >
              Password
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser();
          }}
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

      <input onChange={updateUser} ref={profile} hidden type='file' />
    </div>
  );
};

export default User;
