import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/client/firebase";

const Store = () => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
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
  };
};

export default Store;
