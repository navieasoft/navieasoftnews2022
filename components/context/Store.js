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

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch(`/api/login?token=${token}`);
          const result = await res.json();
          if (res.ok) {
            setUser(result.user);
            localStorage.setItem("token", result.token);
          } else throw result;
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
      }
      setUserLoading(false);
    })();
  }, [update]); //till;

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
