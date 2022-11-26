/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../../components/admin/AdminLayout";
import useStore from "../../../components/context/useStore";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../../../components/common/TextEditor"),
  { ssr: false }
);

const AddNews = () => {
  const { categoryMenu, setAlert, setError, user } = useStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [news, setNews] = useState(null);
  const [subs, setSubs] = useState([]);
  const router = useRouter();
  const body = useRef(null);
  const newsType = [
    "genaral news",
    "hot news",
    "top news",
    "opinion",
    "arts",
    "living",
    "features",
  ];

  function handleCategory(e) {
    const sub = categoryMenu?.find((item) => item.id == e.target.value);
    if (sub) setSubs(sub.subs);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        if (router.query.id) {
          const res = await fetch(`/api/news?id=${router.query?.id}`, {
            signal,
          });
          const result = await res.json();
          if (res.ok) {
            setNews(result);
          } else router.push("/admin/news");
        }
      } catch (error) {
        setError(true);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  useEffect(() => {
    if (news && categoryMenu) {
      const sub = categoryMenu?.find((item) => item.id === news.category_id);
      if (sub) setSubs(sub.subs);
    }
  }, [categoryMenu, news]);

  async function onSubmit(data) {
    setLoading(true);
    data.editor_name = user.name;
    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString("en-us", {
      month: "long",
    })}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    if (news.body !== body.current?.value) {
      data.body = body.current?.value.replaceAll('"', "'");
    }
    data.updated_at = date;
    data.image = data.image[0];
    data.user_id = user?.id;
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    if (data.image) {
      formData.append("existedImg", news.image);
    }
    await updateNews(formData);
    setLoading(false);
  }

  async function updateNews(formData) {
    try {
      const res = await fetch(`/api/news?id=${router.query.id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setAlert({ msg: result.message, type: "success" });
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  }

  return (
    <AdminLayout>
      <section className='create-news-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='news-area'>
          <div className='md:col-span-2 lg:col-span-3'>
            <textarea
              {...register("headline")}
              defaultValue={news?.headline}
              rows={2}
              placeholder='Headline for the news'
            />
            {news && <TextEditor editor={body} value={news.body} />}
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label htmlFor='Category'>Category:</label>
              <select
                {...register("category_id")}
                onChange={(e) => handleCategory(e)}
              >
                <option value=''>select</option>
                {categoryMenu?.map((item, i) => (
                  <option
                    selected={news?.category_id === item.id}
                    key={i}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='Sub Category'>Sub Category:</label>
              <select {...register("sub_category_id")}>
                <option value=''>select</option>
                {subs?.map((sub, i) => (
                  <option
                    selected={news?.sub_category_id == sub.id}
                    key={i}
                    value={sub.id}
                  >
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='newsType'>News type:</label>
              <select {...register("type")}>
                <option value=''>select</option>
                {newsType.map((item, i) => (
                  <option selected={news?.type === item} value={item} key={i}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label>Tags</label>
              <input
                {...register("tags")}
                defaultValue={news?.tags}
                type='text'
                placeholder='type a | b | c'
              />
            </div>

            {news && (
              <div className=''>
                <img src={`/assets/${news.image}`} alt='' />
              </div>
            )}
            <div className='space-y-2'>
              <label htmlFor='topic'>Main Image:</label>
              <input {...register("image")} type='file' />
            </div>

            <div className='flex justify-center'>
              <button disabled={loading} className='btn btn-primary'>
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
};

export default AddNews;
