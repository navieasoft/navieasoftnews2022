import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/client/firebase";

const Store = () => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [userDesignation, setUserDesignation] = useState("user");
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [ipAdress, setIpAddress] = useState(null);
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        setUser(user);
        try {
          const res = await fetch(
            `http://localhost:3000/api/user?uid=${user.uid}`
          );
          if (res.ok) {
            const { designation } = res.json();
            setUserDesignation(designation || "user");
          }
        } catch (error) {
          setUserDesignation("user");
        }
      } else {
        setUser(null);
      }
    });
    return unsub();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("https://geolocation-db.com/json");
        if (res.ok) {
          const result = await res.json();
          setIpAddress(result.IPv4);
          await fetch("http://localhost:3000/api/news/dashboard", {
            headers: {
              "content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
              ipAdress: result.IPv4,
              date: `${new Date()}`,
            }),
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    //fetch siteinfo and settings;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/settings", {
          signal,
        });
        const result = await res.json();
        setSiteInfo(result);
      } catch (error) {}
    })(); //till;

    //fetch category menus;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menus", { signal });
        const result = await res.json();
        setCategoryMenu(result);
      } catch (error) {
        setError(true);
      }
    })(); // till;

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
    categoryMenu,
    userDesignation,
    loading,
    setLoading,
    ipAdress,
  };
};

export default Store;
