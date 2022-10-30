/* eslint-disable @next/next/no-img-element */
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faLink, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TopPart from "../components/common/TopPart";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import LergeAdd from "../components/common/advertizer/LergeAdd";
import TopMenus from "../components/common/TopMenus";
import Link from "next/link";
import CategoryDetailsSideBar from "../components/common/CategoryDetailsSideBar";
import Breakingnews from "../components/common/BreakingNews";
import useStore from "../components/context/useStore";

const Details = () => {
  const [linkCopy, setLinkCopied] = useState(false);
  const { setError, siteInfo } = useStore();
  const [news, setNews] = useState(null);
  const router = useRouter();

  function handleCopyLink() {
    setLinkCopied(true);
    navigator.clipboard.writeText("http://localhost:3000/" + router.asPath);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/news?id=${router.query?.id}`,
          {
            signal,
          }
        );
        if (res.ok) {
          const result = await res.json();
          setNews(result);
        } else throw { message: "No data found" };
      } catch (error) {
        router.push("/404");
        setError(true);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  const relatedNews = [
    {
      _id: 1,
      img: "/topnews.png",
      category: "World News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 2,
      img: "/topnews.png",
      category: "U.S News",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 3,
      img: "/topnews.png",
      category: "Politics",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 4,
      img: "/topnews.png",
      category: "New York",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 5,
      img: "/topnews.png",
      category: "Business",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 6,
      img: "/topnews.png",
      category: "Technology",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 7,
      img: "/topnews.png",
      category: "Science",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 8,
      img: "/topnews.png",
      category: "sports",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 9,
      img: "/topnews.png",
      category: "Health",
      heading: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];

  if (!news) {
    return <p>Loading...</p>;
  }

  return (
    <div className='mb-10'>
      <TopPart page='details' />
      <TopMenus />
      <Breakingnews />

      <LergeAdd picture={"/longadd.png"} />

      <section className='details-page-content-wrapper'>
        <section className='col-span-3 md:col-span-2 print:col-span-3'>
          <section className='news-details-wrapper'>
            {/* top part */}
            <div className='top-part'>
              <p className='space-x-1'>
                <FontAwesomeIcon icon={faClock} />
                <span>18 October, 2022 12:02</span>
              </p>
              <div className='space-x-5'>
                <button onClick={handleCopyLink}>
                  <FontAwesomeIcon icon={faLink} />
                  <span>{linkCopy ? "Copied!" : "Copy Link"}</span>
                </button>
                <button onClick={() => window.print()}>
                  <FontAwesomeIcon icon={faPrint} />
                  <span>Print</span>
                </button>

                <FacebookShareButton url={"https://navieasoft.com/"}>
                  <button>
                    <FontAwesomeIcon icon={faFacebook} />
                    <span>Share</span>
                  </button>
                </FacebookShareButton>
              </div>
            </div>

            {/* news details */}
            <div className='news-details'>
              <h3>{news.headline}</h3>
              <p className='text-lg my-5 space-x-2'>
                <FontAwesomeIcon className='text-gray-600' icon={faEdit} />
                <span>Online Reporter</span>
              </p>
              <img
                className='object-contain'
                src={`/assets/${news.mainImg}`}
                alt='news image'
              />

              <p className='text-justify mt-10 text-xl'>{news.body}</p>

              <p className='mt-10 text-xl'>
                {siteInfo?.name}/{news.editor_name}
              </p>

              <div className='social-icons'>
                <TwitterShareButton url={"https://navieasoft.com/"}>
                  <button className='text-blue-400'>
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                </TwitterShareButton>
                <LinkedinShareButton url={"https://navieasoft.com/"}>
                  <button className='text-[#0e76a8]'>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </button>
                </LinkedinShareButton>
                <FacebookShareButton url={"https://navieasoft.com/"}>
                  <button className='text-blue-600'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>
                </FacebookShareButton>
                <EmailShareButton
                  subject='This the subject of the email'
                  url={"https://navieasoft.com/"}
                >
                  <button>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </button>
                </EmailShareButton>
              </div>
            </div>
          </section>

          <section>
            {/* Realated topic */}
            <div className='related-topic'>
              <p>Realated Topic, You can visit.</p>
              <div className='flex'>
                {news.raletedTopic.map((tp, i) => (
                  <Link href={`/category?q=${tp}`} key={i}>
                    <a>{tp}</a>
                  </Link>
                ))}
              </div>
            </div>

            <LergeAdd picture={"/longadd.png"} />

            {/* Realated news */}
            <section className='print:hidden'>
              <b className='mb-4 block'>Related News:</b>
              <div className='related-news-wrapper'>
                {relatedNews.map((news) => (
                  <Link
                    href={`/details?category=${news.category}&id=${news._id}`}
                    key={news._id}
                  >
                    <a className='news'>
                      <Image
                        className='object-cover object-center rounded-t'
                        width={200}
                        height={100}
                        src={news.img}
                        alt=''
                      />
                      <p className='font-medium px-2 pb-3'>{news.heading}</p>
                    </a>
                  </Link>
                ))}
              </div>
              <div className='flex justify-end mt-5'>
                <button className='btn btn-primary'>Load More</button>
              </div>
            </section>
            <LergeAdd picture={"/longadd.png"} />
          </section>
        </section>

        {/* side bar */}
        <CategoryDetailsSideBar page={"details"} />
      </section>
    </div>
  );
};

export default Details;
