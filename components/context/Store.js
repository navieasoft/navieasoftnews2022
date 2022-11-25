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
  const [userLoading, setUserLoading] = useState(true);
  const [ipAdress, setIpAddress] = useState(null);
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsub;
    (async function () {
      unsub = await manageUser();
      const { error, ipAdress } = await getIpAddress();
      if (!error) {
        await updateVisitor(ipAdress);
      }
    })();
    return () => {
      unsub();
    };
  }, []);

  async function manageUser() {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        setUser(user);
        try {
          const res = await fetch(`/api/user?uid=${user.uid}`);
          if (res.ok) {
            const { designation } = await res.json();
            setUserDesignation(designation || "user");
          }
        } catch (error) {
          setUserDesignation("user");
        }
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });
    return unsub;
  }
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
    userDesignation,
    loading,
    setLoading,
    ipAdress,
    userLoading,
  };
};

export default Store;
