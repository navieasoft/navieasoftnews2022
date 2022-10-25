import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FooterModal = ({ close, title }) => {
  return (
    <form className='footer-modal'>
      <div
        onClick={() => close({ category: "", id: "" })}
        className='close-btn'
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <p className='font-medium'>{title}</p>
      <input type='text' placeholder='Type here..' />
      <button className='btn btn-primary'>Add</button>
    </form>
  );
};

export default FooterModal;
