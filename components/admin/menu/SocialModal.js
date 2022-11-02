import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import useStore from "../../context/useStore";

const SocialModal = ({ close, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const input = useRef(null);
  const image = useRef(null);
  const store = useStore();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("img", image.current?.files[0]);
    formData.append("link", input.current?.value);
    formData.append("userId", store.user?.uid);
    try {
      const res = await fetch("http://localhost:3000/api?socialImg=true", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        store.setAlert({ msg: result.message, type: "success" });
        close("");
        setUpdate((prev) => !prev);
      } else throw result;
    } catch (error) {
      store.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='footer-modal'>
      <div onClick={() => close("")} className='close-btn'>
        <FontAwesomeIcon icon={faClose} />
      </div>
      <p className='font-medium'>Social Link</p>
      <input ref={image} required type='file' />
      <input ref={input} required type='url' placeholder='Type here..' />
      <button disabled={loading} className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default SocialModal;
