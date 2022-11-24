/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Breakingnews from "../../components/common/BreakingNews";
import MiddlePart from "../../components/common/MiddlePart";
import TopMenus from "../../components/common/TopMenus";
import TopPart from "../../components/common/TopPart";
import useStore from "../../components/context/useStore";

const History = () => {
  const [highlight, setHlight] = useState(false);
  const [news, setNews] = useState(null);
  const store = useStore();

  useEffect(() => {
    let unsub = false;
    if (!unsub) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) setHlight(true);
        else setHlight(false);
      });
    }
    return () => (unsub = true);
  }, []);

  useEffect(() => {
    const history = localStorage.getItem("history");
    if (history) {
      store?.setLoading(true);
      const allId = JSON.parse(history).join("|");
      (async function () {
        try {
          const res = await fetch(`/api/news?id=${allId}&multiple=true`);
          const result = await res.json();
          if (res.ok) {
            setNews(result);
          } else throw result;
        } catch (error) {
          store?.setError(true);
        }
      })();
      store?.setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        className={`sticky top-0 lg:static bg-white z-50 ${
          highlight ? "shadow" : ""
        }`}
      >
        <TopPart page='home' />
      </div>
      <MiddlePart />
      <TopMenus />
      <Breakingnews />

      <section>
        {news ? (
          <div className='history-container'>
            {news.map((item) => (
              <Link key={item.id} href={`/details?id=${item.id}`}>
                <a className='item'>
                  <img
                    className='h-20'
                    src={`/assets/${item.mainImg}`}
                    alt=''
                  />
                  <div className='col-span-3'>
                    <p className='mb-2'>
                      <b>{item.headline}</b>
                    </p>
                    <p>{item.body.slice(0, 100)}...</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center my-10 font-semibold text-xl'>
            <p>History empty</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default History;
