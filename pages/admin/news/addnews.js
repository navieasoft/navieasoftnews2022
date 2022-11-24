import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../../components/admin/AdminLayout";
import useStore from "../../../components/context/useStore";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../../../components/common/TextEditor"),
  { ssr: false }
);

const AddNews = () => {
  const [loading, setLoading] = useState(false);
  const { categoryMenu, setAlert, user } = useStore();
  const { register, reset, handleSubmit } = useForm();
  const [subs, setSubs] = useState([]);
  const body = useRef(null);

  function handleCategory(e) {
    const sub = categoryMenu?.find((item) => item.id == e.target.value);
    if (sub) setSubs(sub.subs);
  }

  async function onSubmit(data) {
    setLoading(true);
    if (!user) return;
    data.category_name = categoryMenu.find(
      (item) => item.id == data.category_id
    ).name;
    data.sub_category_name = subs.find(
      (item) => item.id == data.sub_category_id
    ).name;
    data.image = data.image[0];
    data.body = body.current?.value;
    data.user_id = user?.uid;
    data.editor_name = user.displayName;
    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString("en-us", {
      month: "long",
    })}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    data.date = date;
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => formData.append(key, value));

    await postNews(formData);

    setLoading(false);
  }

  async function postNews(formData) {
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      setAlert({ msg: result.message, type: "success" });
      reset();
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
              {...register("headline", { required: true })}
              required
              rows={2}
              placeholder='Headline for the news'
            />
            <TextEditor editor={body} />
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label htmlFor='Category'>Category:</label>
              <select
                {...register("category_id", { required: true })}
                onChange={(e) => handleCategory(e)}
                required
              >
                <option value=''>select</option>
                {categoryMenu?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='Sub Category'>Sub Category:</label>
              <select
                {...register("sub_category_id", { required: subs.length })}
                required={subs.length}
              >
                <option value=''>select</option>
                {subs?.map((sub, i) => (
                  <option key={i} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='newsType'>News type:</label>
              <select required {...register("type", { required: true })}>
                <option value=''>select</option>
                <option value='hot news'>hot news</option>
                <option value='top news'>top news</option>
                <option value='opinion'>opinion</option>
                <option value='arts'>arts</option>
                <option value='living'>living</option>
                <option value='features'>features news</option>
                <option value='genaral news'>genaral news</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='topic'>Main Image:</label>
              <input
                required
                className='w-full'
                {...register("image", { required: true })}
                type='file'
              />
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
