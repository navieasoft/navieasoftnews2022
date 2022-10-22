import React, { useEffect } from "react";
import useStore from "../context/useStore";

const Alert = () => {
  const store = useStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      store?.setAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.alert]);

  return (
    <div
      className={`alert-container ${
        store?.alert.type === "success"
          ? "bg-purple-500"
          : store?.alert.type === "error"
          ? "bg-red-400"
          : "bg-gray-600"
      }`}
    >
      <p>{store?.alert.msg}</p>
    </div>
  );
};

export default Alert;
