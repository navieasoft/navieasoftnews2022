import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/client/firebase";

const Store = () => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [siteInfo, setSiteInfo] = useState(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ msg: "", type: "" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/settings", {
          signal,
        });
        const result = await res.json();
        setSiteInfo(result);
      } catch (error) {}
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return {
    showLoginRegister,
    setShowLoginRegister,
    user,
    setUser,
    alert,
    setAlert,
    showSideMenu,
    setShowSideMenu,
    showSideBar,
    setShowSideBar,
    error,
    setError,
    siteInfo,
    setUpdate,
  };
};

export default Store;
