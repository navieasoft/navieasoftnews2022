import React, { useRef, useState } from "react";
import Header from "../../components/admin/common/header";
import SideBar from "../../components/admin/common/SideBar";

const CreateNews = () => {
  const submitBtn = useRef(null);
  const [news, setNews] = useState({
    heading: "",
    body: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    setNews((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString("en-us", {
      month: "long",
    })}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    console.log(date);
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />
        <section className='create-news-container overflow-auto'>
          <form onSubmit={(e) => handleSubmit(e)} className='news-area'>
            <textarea
              onChange={(e) => handleChange(e)}
              name='heading'
              required
              placeholder='Give a title for the news'
            />
            <textarea
              onChange={(e) => handleChange(e)}
              name='body'
              required
              rows='30'
              placeholder='Write news body'
            />

            <button ref={submitBtn} hidden type='submit'>
              submit
            </button>
          </form>

          <div>
            <div className='flex justify-center'>
              <button
                onClick={() => submitBtn.current?.click()}
                className='btn'
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateNews;
