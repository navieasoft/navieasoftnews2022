/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LergeAdd from "../components/common/advertizer/LergeAdd";
import Breakingnews from "../components/common/BreakingNews";
import CategoryDetailsSideBar from "../components/common/CategoryDetailsSideBar";
import TopMenus from "../components/common/TopMenus";
import TopPart from "../components/common/TopPart";
import useStore from "../components/context/useStore";
import { Markup } from "interweave";

const Category = () => {
  const [news, setNews] = useState(null);
  const [ads, setAds] = useState(null);
  const [page, setPage] = useState(0);
  const { setError } = useStore();
  const router = useRouter();
  const store = useStore();

  async function getData(signal) {
    store.setLoading(true);
    try {
      let url = "";
      if (router.query.q) {
        url = `/api/news/home?category=${router.query.q}&page=${page}`;
      } else if (router.query.sub) {
        url = `/api/news/home?category=${router.query.q}&sub=${router.query.sub}&page=${page}`;
      } else {
        url = `/api/news/home?search=${router.query.search}&page=${page}`;
      }
      const res = await fetch(url, {
        signal,
      });
      const result = await res.json();
      if (res.ok) {
        setNews(result);
      } else throw { message: result.message };
    } catch (error) {
      setError(true);
    }
    store.setLoading(false);
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const res = await fetch("/api/settings/ads", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          setAds(result.other);
        } else throw result;
      } catch (error) {
        console.log(error.message);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  if (!news) return null;
  if (!news.length) {
    return (
      <div className='no-data-container'>
        <p>There is no news</p>
        <button onClick={() => router.push("/")} className='btn btn-primary'>
          Go back
        </button>
      </div>
    );
  }
  return (
    <div>
      <TopPart page='details' />
      <TopMenus />
      <Breakingnews />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads.long[0].image || ""}`}
          link={ads?.long[0].url}
        />
      )}
      <section className='category-wrapper'>
        <section className='col-span-3 md:col-span-2'>
          <Link href={`details?id=${news[0].id}`}>
            <a className='first-item'>
              <img
                className='object-contain'
                src={`/assets/${news[0].image}`}
                alt=''
              />
              <p className='font-medium'>{news[0].headline}</p>
              <Markup content={`${news[0].body.slice(0, 300)}...`} />
            </a>
          </Link>

          {ads && (
            <LergeAdd
              picture={`/ads/${ads?.long[1].image || ""}`}
              link={ads?.long[1].url}
            />
          )}

          <div className='second-item'>
            {news.slice(1, 7).map((news) => (
              <Link href={`details?id=${news.id}`} key={news.id}>
                <a className='news'>
                  <p className='font-medium py-2 px-3'>{news.headline}</p>
                  <img
                    className='object-cover object-center rounded-r'
                    src={`/assets/${news.image}`}
                    alt=''
                  />
                </a>
              </Link>
            ))}
          </div>

          {ads && (
            <LergeAdd
              picture={`/ads/${ads?.long[2].image || ""}`}
              link={ads?.long[2].url}
            />
          )}

          <div className='third-item'>
            {news.slice(8, news.length)?.map((news) => (
              <Link href={`details?id=${news.id}`} key={news.id}>
                <a className='news'>
                  <img
                    className='object-cover object-center rounded-t'
                    src={`/assets/${news.image}`}
                    alt=''
                  />
                  <p className='font-medium py-2 px-3'>{news.headline}</p>
                </a>
              </Link>
            ))}
          </div>
          <div className='flex justify-end mt-5'>
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
                getData();
              }}
              className='btn btn-primary'
            >
              Load More
            </button>
          </div>
        </section>

        {/* side bar */}
        <CategoryDetailsSideBar page={"category"} />
      </section>
    </div>
  );
};

export default Category;
