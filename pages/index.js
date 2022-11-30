import DailyReportOfCountry from "../components/home/DailyReportOfCountry";
const MostPopular = dynamic(() => import("../components/home/MostPopular"));
const OtherNews = dynamic(() => import("../components/home/OtherNews"));
const Features = dynamic(() => import("../components/home/Features"));
import OthersNews from "../components/home/sideSection/OthersNews";
import TopTenNews from "../components/home/sideSection/TopTenNews";
const Opinion = dynamic(() => import("../components/home/Opinion"));
import LergeAdd from "../components/common/advertizer/LergeAdd";
import SmallAdd from "../components/common/advertizer/SmallAd";
const Arts = dynamic(() => import("../components/home/Arts"));
const AtHome = dynamic(() => import("../components/home/AtHome"));
const Living = dynamic(() => import("../components/home/Living"));
const News = dynamic(() => import("../components/home/News"));
import HotNews from "../components/home/sideSection/HotNews";
import Divider from "../components/common/divider/Divider";
import React, { useEffect, useState } from "react";
import TopNews from "../components/home/TopNews";
import TopMenus from "../components/common/TopMenus";
import TopPart from "../components/common/TopPart";
import Breakingnews from "../components/common/BreakingNews";
import MiddlePart from "../components/common/MiddlePart";
import TopHighlight from "../components/home/TopHighlight";
import useStore from "../components/context/useStore";
import dynamic from "next/dynamic";
const BusinessHighlight = dynamic(() =>
  import("../components/home/BusinessHighlight")
);
const CountryHighlight = dynamic(() =>
  import("../components/home/CountryHighlight")
);
const PoliticsHighligh = dynamic(() =>
  import("../components/home/PoliticsHighligh")
);
const ScienceTechnology = dynamic(() =>
  import("../components/home/ScienceTechnology")
);

const Home = () => {
  const [otherNews, setOtherNews] = useState(null);
  const [highlight, setHlight] = useState(false);
  const [data, setData] = useState(null);
  const [ads, setAds] = useState(null);
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
    const controller = new AbortController();
    const signal = controller.signal;
    //main news for home page;
    (async function () {
      store.setLoading(true);
      try {
        const res = await fetch("/api/news/home");
        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else throw result;
      } catch (error) {
        store.setError(true);
      }
      store.setLoading(false);
    })();
    //ad images for home page
    (async function () {
      try {
        const res = await fetch("/api/settings/ads", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          setAds(result.home);
        } else throw result;
      } catch (error) {
        console.log(error.message);
      }
    })();
    //rest of the news for home page;
    (async function () {
      try {
        const res = await fetch("/api/news/home?otherNews=true", { signal });
        const result = await res.json();
        if (res.ok) {
          setOtherNews(result);
        } else throw result;
      } catch (error) {
        console.log(error.message);
      }
    })();

    return () => {
      controller.abort();
    };
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
      <TopHighlight data={data?.hotNews?.slice(0, 3) || null} />
      <section className='home-part_1'>
        <section className='col-span-3'>
          <TopNews data={data?.topNews || null} />
          <DailyReportOfCountry />
          <CountryHighlight data={data?.countryNews || null} />
          <PoliticsHighligh data={data?.politicsNews || null} />
          <BusinessHighlight data={data?.businessNews || null} />
        </section>
        <section className='hidden md:block col-span-2 lg:col-span-1'>
          <HotNews data={data?.hotNews[3] || null} />
          {ads && (
            <SmallAdd
              picture={`/ads/${ads?.small[0].image || ""}`}
              link={ads?.small[0].link}
            />
          )}
          <TopTenNews data={data?.latestNews?.slice(0, 10) || null} />
          {ads && (
            <SmallAdd
              picture={`/ads/${ads?.small[1].image || ""}`}
              link={ads?.small[1].link}
            />
          )}
          <OthersNews
            data={data?.latestNews?.slice(10, data?.latestNews?.length || null)}
          />
          {ads && (
            <SmallAdd
              picture={`/ads/${ads?.small[2].image || ""}`}
              link={ads?.small[2].link}
            />
          )}
        </section>
      </section>

      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[0].image || ""}`}
          link={ads?.long[0].link}
        />
      )}
      <Divider />
      <OtherNews data={otherNews?.otherNews || null} />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[1].image || ""}`}
          link={ads?.long[1].link}
        />
      )}
      <Divider />
      <AtHome data={otherNews?.homeNews || null} />
      <Divider />
      <Features data={otherNews?.featuresNews || null} />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[2].image || ""}`}
          link={ads?.long[2].link}
        />
      )}
      <Divider />
      <ScienceTechnology />
      <Divider />
      <MostPopular />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[3].image || ""}`}
          link={ads?.long[3].link}
        />
      )}
      <Divider />
      <News />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[4].image || ""}`}
          link={ads?.long[4].link}
        />
      )}
      <Divider />
      <Opinion />
      <Arts />
      {ads && (
        <LergeAdd
          picture={`/ads/${ads?.long[5].image || ""}`}
          link={ads?.long[5].link}
        />
      )}
      <Divider />
      <Living />
    </div>
  );
};

export default Home;
