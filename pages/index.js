import React, { useEffect, useState } from "react";
import LergeAdd from "../components/common/advertizer/LergeAdd";
import SmallAdd from "../components/common/advertizer/SmallAd";
import Divider from "../components/common/divider/Divider";
import Arts from "../components/home/Arts";
import AtHome from "../components/home/AtHome";
import BusinessHighlight from "../components/home/BusinessHighlight";
import CountryHighlight from "../components/home/CountryHighlight";
import DailyReportOfCountry from "../components/home/DailyReportOfCountry";
import ExtraMenus from "../components/home/ExtraMenus";
import Features from "../components/home/Features";
import Living from "../components/home/Living";
import MostPopular from "../components/home/MostPopular";
import News from "../components/home/News";
import Opinion from "../components/home/Opinion";
import OtherNews from "../components/home/OtherNews";
import PoliticsHighligh from "../components/home/PoliticsHighligh";
import ScienceTechnology from "../components/home/ScienceTechnology";
import HotNews from "../components/home/sideSection/HotNews";
import OthersNews from "../components/home/sideSection/OthersNews";
import TopTenNews from "../components/home/sideSection/TopTenNews";
import TopHighlight from "../components/home/TopHighLight";
import TopNews from "../components/home/TopNews";
import TopMenus from "../components/common/TopMenus";
import TopPart from "../components/common/TopPart";
import Breakingnews from "../components/common/BreakingNews";
import MiddlePart from "../components/common/MiddlePart";

const Home = () => {
  const [highlight, setHlight] = useState(false);

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
      <TopHighlight />
      <section className='home-part_1'>
        <section className='col-span-3'>
          <TopNews />
          <DailyReportOfCountry />
          <CountryHighlight />
          <PoliticsHighligh />
          <BusinessHighlight />
        </section>
        <section className='hidden md:block col-span-2 lg:col-span-1'>
          <HotNews />
          <SmallAdd
            picture='/ad-1.png'
            link='https://iqbalhossen-c5422.web.app/'
          />
          <TopTenNews />
          <SmallAdd
            picture='/ad-1.png'
            link='https://iqbalhossen-c5422.web.app/'
          />
          <OthersNews />
          <SmallAdd
            picture='/ad-1.png'
            link='https://iqbalhossen-c5422.web.app/'
          />
        </section>
      </section>

      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <OtherNews />
      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <AtHome />
      <Divider />
      <Features />
      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <ScienceTechnology />
      <Divider />
      <MostPopular />
      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <News />
      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <Opinion />
      <Arts />
      <LergeAdd
        picture='/longadd.png'
        link='https://iqbalhossen-c5422.web.app/'
      />
      <Divider />
      <Living />
    </div>
  );
};

export default Home;
