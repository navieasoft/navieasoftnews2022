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

const Category = () => {
  const [news, setNews] = useState(null);
  const [ads, setAds] = useState(null);
  const { setError } = useStore();
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      store.setLoading(true);
      try {
        const res = await fetch(
          `/api/news/home?category=${router.query.q}&sub=${
            router.query.sub || ""
          }`,
          {
            signal,
          }
        );
        const result = await res.json();
        if (res.ok) {
          setNews(result);
        } else throw { message: result.message };
      } catch (error) {
        setError(true);
      }
      store.setLoading(false);
    })();
    return () => {
      controller.abort();
    };
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
          setAds(result.others);
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
      <LergeAdd
        picture={`/ads/${ads?.long[0].adImg || ""}`}
        link={ads?.long[0].url}
      />
      <section className='category-wrapper'>
        <section className='col-span-3 md:col-span-2'>
          <Link href={`details?category=${news[0].category}&id=${news[0].id}`}>
            <a className='first-item'>
              <img
                className='object-contain'
                src={`/assets/${news[0].mainImg}`}
                alt=''
              />
              <p className='font-medium'>{news[0].headline}</p>
              <p>{news[0].body.slice(0, 300)}...</p>
            </a>
          </Link>

          <LergeAdd
            picture={`/ads/${ads?.long[1].adImg || ""}`}
            link={ads?.long[1].url}
          />

          <div className='second-item'>
            {news.slice(1, 7).map((news) => (
              <Link
                href={`details?category=${news.category}&id=${news.id}`}
                key={news.id}
              >
                <a className='news'>
                  <p className='font-medium py-2 px-3'>{news.headline}</p>
                  <img
                    className='object-cover object-center rounded-r'
                    src={`/assets/${news.mainImg}`}
                    alt=''
                  />
                </a>
              </Link>
            ))}
          </div>

          <LergeAdd
            picture={`/ads/${ads?.long[2].adImg || ""}`}
            link={ads?.long[2].url}
          />

          <div className='third-item'>
            {news.slice(8, news.length)?.map((news) => (
              <Link
                href={`details?category=${news.category}&id=${news.id}`}
                key={news.id}
              >
                <a className='news'>
                  <img
                    className='object-cover object-center rounded-t'
                    src={`/assets/${news.mainImg}`}
                    alt=''
                  />
                  <p className='font-medium py-2 px-3'>{news.headline}</p>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* side bar */}
        <CategoryDetailsSideBar page={"category"} />
      </section>
    </div>
  );
};

export default Category;
