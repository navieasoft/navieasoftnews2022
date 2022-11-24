/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import useStore from "../../../components/context/useStore";
import { axios } from "../../../services/client/common";

const Advertising = () => {
  const [update, setUpdate] = useState(false);
  const [ads, setAds] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("/api/settings/ads", {
          signal,
        });
        const result = await res.json();
        if (res.ok) setAds(result);
        else throw result;
      } catch (error) {
        store.setError(true);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <AdminLayout>
      <section className='advertisement-wrapper'>
        {ads ? (
          <>
            <h3>All Ads for Home page</h3>
            <h4>Small Ads:</h4>
            <div className='small-wrapper'>
              {ads &&
                ads.home.small.map((item, i) => (
                  <AdComponent
                    setUpdate={setUpdate}
                    title='small'
                    key={i}
                    item={item}
                  />
                ))}
            </div>
            <h4 className='mt-7'>Long Ads:</h4>
            <div className='long-wrapper'>
              {ads &&
                ads.home.long.map((item, i) => (
                  <AdComponent
                    setUpdate={setUpdate}
                    title='long'
                    key={i}
                    item={item}
                  />
                ))}
            </div>

            <h3 className='mt-16'>All Ads for Details & Category pages</h3>
            <h4>Small Ads:</h4>
            <div className='small-wrapper'>
              {ads &&
                ads.other.small.map((item, i) => (
                  <AdComponent
                    setUpdate={setUpdate}
                    title='small'
                    key={i}
                    item={item}
                  />
                ))}
            </div>
            <h4 className='mt-7'>Long Ads:</h4>
            <div className='long-wrapper'>
              {ads &&
                ads.other.long.map((item, i) => (
                  <AdComponent
                    setUpdate={setUpdate}
                    title='long'
                    key={i}
                    item={item}
                  />
                ))}
            </div>
          </>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default Advertising;

function AdComponent({ item, title, setUpdate }) {
  const [loading, setLoading] = useState(false);
  const store = useStore();
  const link = useRef(null);
  const img = useRef(null);

  async function handleSubmit(e, exist, id) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", store?.user.uid);
      if (link.current.value) formData.append("link", link.current.value);
      if (img.current.files.length) {
        formData.append("image", img.current.files[0]);
        formData.append("exist", exist);
      }
      const result = await axios(`/api/settings/ads?id=${id}`, {
        method: "POST",
        body: formData,
      });
      store.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  return (
    <div className={title === "small" ? "small-item" : "long-item"}>
      <img src={`/ads/${item.image}`} alt='' />
      <form
        className='space-y-4 mt-4'
        onSubmit={(e) => handleSubmit(e, item.image, item.id)}
      >
        <input
          defaultValue={item.link || ""}
          ref={link}
          type='url'
          placeholder='Enter url'
        />
        <input ref={img} type='file' />
        <div className='flex justify-center'>
          <button disabled={loading} className='custom-btn'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
