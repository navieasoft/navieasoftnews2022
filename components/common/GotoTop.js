import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const GotoTop = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let unsub = false;
    if (!unsub) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 400) setShowTop(true);
        else setShowTop(false);
      });
    }
    return () => (unsub = true);
  }, []);

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`goto-top-container ${showTop ? "flex" : "hidden"}`}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  );
};

export default GotoTop;
