import React, { useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import { category } from "../../../services/client/menus";

const UpdateNews = () => {
  const [subs, setSubs] = useState([]);
  const [news, setNews] = useState({});

  function handleCategory(e) {
    const sub = Category.find((item) => item.name === e.target.value);
    if (sub) setSubs(sub.subs);
    else setSubs(["Nothing to select"]);
    handleChange(e);
  }

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

    console.log(news);
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />

        <section className='create-news-container'>
          <form onSubmit={(e) => handleSubmit(e)} className='news-area'>
            <div className='md:col-span-2 lg:col-span-3'>
              <textarea
                onChange={(e) => handleChange(e)}
                name='heading'
                required
                rows={2}
                placeholder='Headline for the news'
              />
              <textarea
                onChange={(e) => handleChange(e)}
                name='body'
                required
                rows='20'
                placeholder='Write the news body'
              />
            </div>

            <div className='space-y-3'>
              <div className='space-y-2'>
                <label htmlFor='Category'>Category:</label>
                <select
                  required
                  name='category'
                  onChange={(e) => handleCategory(e)}
                >
                  <option value=''></option>
                  {category.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='Sub Category'>Sub Category:</label>
                <select required name='subs' onChange={(e) => handleChange(e)}>
                  {subs?.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='newsType'>News type:</label>
                <select name='newsType' onChange={(e) => handleChange(e)}>
                  <option value='genaral news'>genaral news</option>
                  <option value='hot news'>hot news</option>
                  <option value='top news'>top news</option>
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Related Topic:</label>
                <input
                  required
                  name='raletedTopic'
                  onChange={(e) => handleChange(e)}
                  type='text'
                  placeholder='Type a | b | c'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Main Image:</label>
                <input
                  required
                  name='main-img'
                  onChange={(e) => handleChange(e)}
                  type='file'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 1:</label>
                <input
                  name='featureImg1'
                  onChange={(e) => handleChange(e)}
                  type='file'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 2:</label>
                <input
                  name='featureImg2'
                  onChange={(e) => handleChange(e)}
                  type='file'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 3:</label>
                <input
                  name='featureImg3'
                  onChange={(e) => handleChange(e)}
                  type='file'
                />
              </div>

              <div className='flex justify-center'>
                <button className='btn btn-primary'>Save</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateNews;
