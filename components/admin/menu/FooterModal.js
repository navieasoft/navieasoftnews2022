import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import useStore from "../../context/useStore";

const FooterModal = ({ close, title, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const input = useRef(null);
  const store = useStore();

  async function addFooterMenu(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/menus/footermenus", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title, value: input.current?.value }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
      close("");
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={(e) => addFooterMenu(e)} className='footer-modal'>
      <div onClick={() => close("")} className='close-btn'>
        <FontAwesomeIcon icon={faClose} />
      </div>
      <p className='font-medium'>{title}</p>
      <input ref={input} required type='text' placeholder='Type here..' />
      <button disabled={loading} className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default FooterModal;
