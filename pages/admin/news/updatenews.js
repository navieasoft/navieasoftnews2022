import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const AddNews = () => {
  const { categoryMenu, setAlert, setError, user } = useStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [news, setNews] = useState(null);
  const [subs, setSubs] = useState([]);
  const router = useRouter();
  const newsType = ["genaral news", "hot news", "top news"];

  function handleCategory(e) {
    const sub = categoryMenu?.find((item) => item.name === e.target.value);
    if (sub) setSubs(sub.subs);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/news?id=${router.query?.id}`,
          {
            signal,
          }
        );
        const result = await res.json();
        setNews(result);
      } catch (error) {
        setError(true);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  async function onSubmit(data) {
    setLoading(true);
    data.editor_name = user.displayName;
    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString("en-us", {
      month: "long",
    })}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    if (data.raletedTopic.includes("|")) {
      data.raletedTopic = data.raletedTopic
        .split("|")
        .map((topic) => topic.trim());
    } else {
      data.raletedTopic = [data.raletedTopic];
    }
    data.raletedTopic = JSON.stringify(data.raletedTopic);
    data.date = date;
    data.mainImg = data.mainImg[0];
    data.featureImg1 = data.featureImg1[0] || "";
    data.featureImg2 = data.featureImg2[0] || "";
    data.featureImg3 = data.featureImg3[0] || "";
    const formData = new FormData();
    const existedImg = [];
    Object.entries(data).map(([key, value]) => {
      if (value) {
        formData.append(key, value);
        if (
          key === "mainImg" ||
          key === "featureImg1" ||
          key === "featureImg2" ||
          key === "featureImg3"
        ) {
          if (news[key]) existedImg.push(news[key]);
        }
      }
    });
    if (existedImg.length) {
      formData.append("existedImg", existedImg);
    }
    await updateNews(formData);
    setLoading(false);
  }

  async function updateNews(formData) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/news?id=${router.query.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      setAlert({ msg: result.message, type: "success" });
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5'>
        <SideBar />

        <section className='create-news-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='news-area'>
            <div className='md:col-span-2 lg:col-span-3'>
              <textarea
                {...register("headline")}
                defaultValue={news?.headline}
                rows={2}
                placeholder='Headline for the news'
              />
              <textarea
                {...register("body")}
                defaultValue={news?.body}
                rows='20'
                placeholder='Write the news body'
              />
            </div>

            <div className='space-y-3'>
              <div className='space-y-2'>
                <label htmlFor='Category'>Category:</label>
                <select
                  {...register("category")}
                  onChange={(e) => handleCategory(e)}
                >
                  <option value=''>select</option>
                  {categoryMenu?.map((item, i) => (
                    <option
                      selected={news?.category === item.name}
                      key={i}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='Sub Category'>Sub Category:</label>
                <select {...register("subs")}>
                  <option value=''>select</option>
                  {subs?.map((sub, i) => (
                    <option
                      selected={news?.category === sub}
                      key={i}
                      value={sub}
                    >
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='newsType'>News type:</label>
                <select {...register("newsType")}>
                  <option value=''>select</option>
                  {newsType.map((item, i) => (
                    <option
                      selected={news?.newsType === item}
                      value={item}
                      key={i}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Related Topic:</label>
                <input
                  defaultValue={news?.raletedTopic?.join(" | ")}
                  {...register("raletedTopic")}
                  type='text'
                  placeholder='Type a | b | c'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Main Image:</label>
                <input {...register("mainImg")} type='file' />
              </div>

              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 1:</label>
                <input {...register("featureImg1")} type='file' />
              </div>
              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 2:</label>
                <input {...register("featureImg2")} type='file' />
              </div>
              <div className='space-y-2'>
                <label htmlFor='topic'>Features Image 3:</label>
                <input {...register("featureImg3")} type='file' />
              </div>

              <div className='flex justify-center'>
                <button disabled={loading} className='btn btn-primary'>
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddNews;
