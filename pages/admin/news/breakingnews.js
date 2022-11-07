import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Footer from "../../../components/admin/common/Footer";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const Breakingnews = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState(null);
  const [update, setUpdate] = useState(false);
  const store = useStore();
  const input = useRef(null);

  async function addBreakingNews(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/news/breakingnews", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          value: input.current?.value,
          userId: store?.user?.uid,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  async function deleteBreakingNews(value) {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/news/breakingnews", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ value, userId: store?.user?.uid }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/news/breakingnews", {
          signal,
        });
        const result = await res.json();
        setNews(result);
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
      <div style={{ minHeight: "calc(100vh - 100px)" }}>
        <div className='breaking-news-container'>
          <h3 className='text-center my-2 underline underline-offset-8'>
            Currently Showing These News
          </h3>
          {news &&
            news.breakingNews.map((item, i) => (
              <div className='flex justify-between px-5' key={i}>
                <p className='text-lg font-medium'>{item}</p>
                <button
                  disabled={loading}
                  onClick={() => deleteBreakingNews(item)}
                  className='w-5'
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
        </div>
        <div className='flex justify-end mt-3'>
          <button
            onClick={() => setShowAdd((prev) => !prev)}
            className='btn btn-primary'
          >
            {showAdd ? "Close" : "Add Another"}
          </button>
        </div>
        <form
          onSubmit={(e) => addBreakingNews(e)}
          className={`add-breaking-news ${showAdd ? "block" : "hidden"}`}
        >
          <h3>Add New Breaking News</h3>
          <textarea
            required
            ref={input}
            placeholder='Type here...'
            cols='30'
            rows='3'
          />
          <div className='flex justify-center absolute top-2 right-3'>
            <button disabled={loading} className='btn btn-primary'>
              Save
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Breakingnews;
