import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const MenuModal = ({ closeModal, openModal, title, action }) => {
  const input = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    action(value);
  }

  return (
    <div className={`add-menus-wrapper ${openModal ? "block" : "hidden"}`}>
      <form onSubmit={(e) => handleSubmit(e)} className='space-y-3'>
        <div onClick={() => closeModal(false)} className='close-btn'>
          <FontAwesomeIcon icon={faClose} />
        </div>

        <div>
          <p className='text-center mb-3'>{title} Category Menu</p>
          <input
            type='text'
            ref={input}
            onChange={(e) => handleChange(e)}
            name='main'
            placeholder='Type here'
          />
        </div>
        <div className='flex justify-center'>
          <button className='btn btn-primary'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default MenuModal;
