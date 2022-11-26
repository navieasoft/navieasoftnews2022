import { useEffect, useState } from "react";

const Store = () => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [ipAdress, setIpAddress] = useState(null);
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState("/");
  const [token, setToken] = useState(null);

  //manage user;
  useEffect(() => {
    // transfers sessionStorage from one tab to another
    const manageUserSession = function (event) {
      if (!event) {
        event = window.event;
      } // ie suq
      if (!event.newValue) return; // do nothing if no value to work with
      if (event.key == "getSessionStorage") {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        // the other tab should now have it, so we're done with it.
        localStorage.removeItem("sessionStorage"); // <- could do short timeout as well.
      } else if (event.key == "sessionStorage" && !sessionStorage.length) {
        // another tab sent data <- get it
        const data = JSON.parse(event.newValue);
        for (const key in data) {
          sessionStorage.setItem(key, data[key]);
        }
        if (data.token) setToken(data.token);
      }
    };
    // listen for changes to localStorage
    if (window.addEventListener) {
      window.addEventListener("storage", manageUserSession, false);
    } else {
      window.attachEvent("onstorage", manageUserSession);
    }

    // Ask other tabs for session storage (this is ONLY to trigger event)
    if (!sessionStorage.length) {
      localStorage.setItem("getSessionStorage", "token");
      localStorage.removeItem("getSessionStorage", "token");
    }
    return () => {
      window.removeEventListener("storage", manageUserSession);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const res = await fetch(`/api/login?token=${token}`);
          const result = await res.json();
          if (res.ok) {
            setUser(result.user);
            sessionStorage.setItem("token", result.token);
          } else throw result;
        }
      } catch (error) {
        setUser(null);
        sessionStorage.removeItem("token");
      }
      setUserLoading(false);
    })();
  }, [token, update]); //till;

  async function getIpAddress() {
    try {
      const res = await fetch(
        `https://geolocation-db.com/json/${process.env.NEXT_PUBLIC_IP_ADDRESS}`
      );
      if (res.ok) {
        const result = await res.json();
        setIpAddress(result.IPv4);
        return { error: false, ipAdress: result.IPv4 };
      }
    } catch (error) {
      return { error: true, ipAdress: null };
    }
  }

  async function updateVisitor(ipAdress) {
    try {
      const res = await fetch("/api/news/dashboard", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ipAdress }),
      });
      const result = await res.json();
      if (!res.ok) throw result;
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    (async () => {
      const { error, ipAdress } = await getIpAddress();
      if (!error) {
        await updateVisitor(ipAdress);
      }
    })();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      //fetch siteinfo and settings;
      await getSiteInfo(signal);
      //fetch category menus;
      await getMenus(signal);
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  async function getSiteInfo(signal) {
    try {
      const res = await fetch("/api/settings", {
        signal,
      });
      const result = await res.json();
      if (res.ok) setSiteInfo(result);
      else throw result;
    } catch (error) {}
  }
  async function getMenus(signal) {
    try {
      const res = await fetch("/api/menus", {
        signal,
      });
      const result = await res.json();
      if (res.ok) setCategoryMenu(result);
      else throw result;
    } catch (error) {
      setError(true);
    }
  }

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
    loading,
    setLoading,
    ipAdress,
    userLoading,
    redirect,
    setRedirect,
  };
};

export default Store;
