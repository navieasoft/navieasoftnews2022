import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { axios } from "../../../services/client/common";
import useStore from "../../context/useStore";

const FooterModal = ({ close, collumn, setUpdate, title }) => {
  const [loading, setLoading] = useState(false);
  const input = useRef(null);
  const store = useStore();

  async function addFooterMenu(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios("/api/menus/footermenus", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          collumn,
          name: input.current?.value,
          userId: store?.user?.id,
        }),
      });

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
      <input
        ref={input}
        required
        type={collumn === 6 ? "url" : "text"}
        placeholder='Type here..'
      />
      <button disabled={loading} className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default FooterModal;
