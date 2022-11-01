/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import Spinner from "../../../components/common/Spinner";
import useStore from "../../../components/context/useStore";

const Advertising = () => {
  const [update, setUpdate] = useState(false);
  const [ads, setAds] = useState(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/settings/ads", {
          signal,
        });
        const result = await res.json();
        setAds(result);
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
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5 overflow-auto'>
        <div className='w-[200px]'>
          <SideBar />
        </div>
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
                  ads.others.small.map((item, i) => (
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
                  ads.others.long.map((item, i) => (
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
      </div>
    </div>
  );
};

export default Advertising;

function AdComponent({ item, title, setUpdate }) {
  const [loading, setLoading] = useState(false);
  const store = useStore();
  const url = useRef(null);
  const img = useRef(null);

  async function handleSubmit(e, exist, id) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (!url.current.value || !img.current.files.length) {
        store.setAlert({ msg: "no changes found" });
        setLoading(false);
        return;
      }
      if (url.current.value) formData.append("url", url.current.value);
      if (img.current.files.length) {
        formData.append("adImg", img.current.files[0]);
        formData.append("exist", exist);
      }

      const res = await fetch(
        `http://localhost:3000/api/settings/ads?id=${id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (res.ok) {
        store.setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      } else throw result;
    } catch (error) {
      store.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  return (
    <div className={title === "small" ? "small-item" : "long-item"}>
      <img src={`/ads/${item.adImg}`} alt='' />
      <form
        className='space-y-4 mt-4'
        onSubmit={(e) => handleSubmit(e, item.adImg, item._id)}
      >
        <input
          defaultValue={item.url || ""}
          ref={url}
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
