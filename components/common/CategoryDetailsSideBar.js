/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { axios } from "../../services/client/common";
import useStore from "../context/useStore";
import SmallAdd from "./advertizer/SmallAd";

const CategoryDetailsSideBar = ({ page }) => {
  const [latestNews, setLatestNews] = useState(null);
  const [mostreaded, setMostReaded] = useState(null);
  const [ads, setAds] = useState(null);
  const { setError } = useStore();

  useEffect(() => {
    (async function () {
      try {
        const latest = await axios("/api/news?page=0");
        const mostreaded = await axios("/api/news/home?mostreaded=true");
        const ads = await axios("/api/settings/ads");
        setLatestNews(latest);
        setMostReaded(mostreaded);
        setAds(ads.other);
      } catch (error) {
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='hidden md:block'>
      {ads && (
        <SmallAdd
          picture={`/ads/${ads?.small[0].image || ""}`}
          link={ads?.small[0].link}
        />
      )}

      {/* latest news */}
      <div
        className={`some-news ${
          page === "details" ? "h-[900px]" : "h-[430px]"
        }`}
      >
        <b>Latest news:</b>
        {latestNews &&
          latestNews?.map((news) => (
            <Link href={`details?id=${news.id}`} key={news.id}>
              <a className='news'>
                <img
                  className='object-contain'
                  src={`/assets/${news.image}`}
                  alt=''
                />
                <p className='font-medium col-span-2'>{news.headline}</p>
              </a>
            </Link>
          ))}
      </div>
      {ads && (
        <SmallAdd
          picture={`/ads/${ads?.small[1].image || ""}`}
          link={ads?.small[1].link}
        />
      )}

      {/* most read news */}
      <div className='some-news h-[900px]'>
        <b>Most read:</b>
        {mostreaded &&
          mostreaded?.map((news) => (
            <Link href={`details?id=${news.id}`} key={news.id}>
              <a className='news'>
                <p className='font-medium col-span-2 pl-2'>{news.headline}</p>
                <img
                  className='object-contain'
                  src={`/assets/${news.image}`}
                  alt=''
                />
              </a>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CategoryDetailsSideBar;
