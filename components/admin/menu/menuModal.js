import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import useStore from "../../context/useStore";

const MenuModal = (props) => {
  const { closeModal, openModal, title, action, setUpdate, categoryId } = props;
  const [loading, setLoading] = useState(false);
  const input = useRef(null);
  const store = useStore();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (title === "Add") {
      await action(input.current?.value, store);
    } else {
      await action(input.current?.value, store, categoryId);
    }
    input.current.value = "";
    setUpdate((prev) => !prev);
    closeModal(false);
    setLoading(false);
  }

  return (
    <div className={`add-menus-wrapper ${openModal ? "block" : "hidden"}`}>
      <form onSubmit={(e) => handleSubmit(e)} className='space-y-3'>
        <div onClick={() => closeModal(false)} className='close-btn'>
          <FontAwesomeIcon icon={faClose} />
        </div>

        <div>
          <p className='text-center mb-3'>{title} Category Menu</p>
          <input required type='text' ref={input} placeholder='Type here' />
        </div>
        <div className='flex justify-center'>
          <button disabled={loading} className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuModal;
