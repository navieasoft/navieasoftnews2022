import Link from "next/link";
import React, { useState } from "react";

const ExtraMenus = () => {
  const [highlight, setHighlight] = useState("");

  const menus = [
    "Hospitals",
    "Vaccine distribution",
    "State restrictions",
    "U.K cases",
    "Vaccines",
  ];

  return (
    <div className='extra-menus-container'>
      <p>Other trackers:</p>
      {menus.map((menu, i) => (
        <button
          onClick={() => setHighlight(menu)}
          className={highlight === menu ? "underline" : ""}
          key={i}
        >
          <Link href={"/?" + menu.toLowerCase().replace(" ", "")}>{menu}</Link>
        </button>
      ))}
      <button>Choose yur own pleces to track</button>
    </div>
  );
};

export default ExtraMenus;
