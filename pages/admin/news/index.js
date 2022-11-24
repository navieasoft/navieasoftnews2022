import {
  faEdit,
  faEllipsisVertical,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Footer from "../../../components/admin/common/Footer";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const Allnews = () => {
  const { setError, setAlert, user } = useStore();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(-1);
  const [update, setUpdate] = useState(false);
  const [news, setNews] = useState(null);
  const [page, setPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(`/api/news?page=${page}`, {
          signal,
        });
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
  }, [update, page]);

  async function handleDelete(id, image) {
    const confirm = window.confirm("Are you sure to delete?");
    if (confirm) {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", user?.uid);
      formData.append("image", image);
      try {
        const res = await fetch(`/api/news?id=${id}`, {
          method: "DELETE",
          body: formData,
        });
        const result = await res.json();
        if (!res.ok) throw { message: result.message };
        setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      } catch (error) {
        setAlert({ msg: error.message, type: "error" });
      }
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className='allnews-container'>
        <table>
          <thead>
            <tr>
              <th>Headline</th>
              <th>Category</th>
              <th>Editor_name</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {news && news.length ? (
              news?.map((news, i) => (
                <tr onClick={() => setShowMenu(-1)} key={i}>
                  <td style={{ textAlign: "left" }}>
                    {news.headline.slice(0, 200)}{" "}
                    {news.headline.length > 200 && "..."}
                  </td>
                  <td>{news.category_name}</td>
                  <td>{news.editor_name}</td>
                  <td>{news.date}</td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className='space-x-2 relative'
                  >
                    <button onClick={() => setShowMenu(i)} className='w-5'>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <div
                      className={`controll-menus ${
                        showMenu === i ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() =>
                          router.push(`/admin/news/updatenews?id=${news.id}`)
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => router.push(`/details?id=${news.id}`)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => handleDelete(news.id, news.image)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='w-full'>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='btn-group flex justify-end my-3 pr-4 w-full'>
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className='btn'
          >
            «
          </button>
          <button className='btn'>Page {page + 1}</button>
          <button onClick={() => setPage((prev) => prev + 1)} className='btn'>
            »
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Allnews;
