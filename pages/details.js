/* eslint-disable @next/next/no-img-element */
import { faEdit, faLink, faPrint } from "@fortawesome/free-solid-svg-icons";
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Comment from "../components/details/Comment";

const Details = () => {
  const [relatedNews, setRelatedNews] = useState(null);
  const { setError, siteInfo, ipAdress } = useStore();
  const [linkCopy, setLinkCopied] = useState(false);
  const [update, setUpdate] = useState(false);
  const [news, setNews] = useState(null);
  const [ads, setAds] = useState(null);
  const [skip, setSkip] = useState(0);
  const router = useRouter();
  const store = useStore();

  function handleCopyLink() {
    setLinkCopied(true);
    navigator.clipboard.writeText("http://localhost:3000/" + router.asPath);
  }

  async function getSingeNews(signal) {
    store.setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/news?id=${router.query?.id}`,
        {
          signal,
        }
      );
      const result = await res.json();
      if (res.ok) {
        setNews(result);
        //get related news;
        await getRelatedNews(result.category);
      } else throw result;
    } catch (error) {
      setError(true);
    }
    store.setLoading(false);
  }
  async function updateViewPost(ipAdress) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/news/dashboard?id=${router.query.id}&news=true`,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            date: `${new Date().toDateString()}`,
            ipAdress,
          }),
        }
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      throw { message: "There was an error" };
    }
  }
  async function getRelatedNews(category) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/news/home?category=${category}&limit=9&skip=${skip}`
      );
      const result = await res.json();
      if (res.ok) {
        setRelatedNews(result);
      } else throw result;
    } catch (error) {
      throw error;
    }
  }
  function saveNewsHistory() {
    try {
      const history = localStorage.getItem("history");
      if (history) {
        const news = JSON.parse(history);
        const isExist = news.find((id) => id === router.query.id);
        if (!isExist) {
          news.push(router.query.id);
          localStorage.setItem("history", JSON.stringify(news));
        }
      } else {
        localStorage.setItem("history", JSON.stringify([router.query.id]));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    //get the news;
    if (router.query.id) {
      (async () => {
        await getSingeNews(signal);
        //update news views;
        if (ipAdress) {
          await updateViewPost(ipAdress);
        }

        saveNewsHistory();
      })();
    }
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, ipAdress, update]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const res = await fetch("http://localhost:3000/api/settings/ads", {
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
  return (
    <div className='mb-10'>
      <TopPart page='details' />
      <TopMenus />
      <Breakingnews />

      <LergeAdd
        picture={`/ads/${ads?.long[0].adImg || ""}`}
        link={ads?.long[0].url}
      />

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
                  <a className='text-blue-400'>
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </TwitterShareButton>
                <LinkedinShareButton url={"https://navieasoft.com/"}>
                  <a className='text-[#0e76a8]'>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </LinkedinShareButton>
                <FacebookShareButton url={"https://navieasoft.com/"}>
                  <a className='text-blue-600'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </FacebookShareButton>
                <EmailShareButton
                  subject='This the subject of the email'
                  url={"https://navieasoft.com/"}
                >
                  <a>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </EmailShareButton>
              </div>
            </div>
          </section>

          {/* comment section */}
          <Comment
            newsId={news?._id}
            setUpdate={setUpdate}
            comments={news.comments || null}
          />

          <section>
            <LergeAdd
              picture={`/ads/${ads?.long[1].adImg || ""}`}
              link={ads?.long[1].url}
            />

            {/* Realated news */}
            <section className='print:hidden'>
              <b className='mb-4 block'>Related News:</b>
              <div className='related-news-wrapper'>
                {relatedNews && relatedNews.length ? (
                  relatedNews.map((news) => (
                    <Link
                      href={`/details?category=${news.category}&id=${news._id}`}
                      key={news._id}
                    >
                      <a className='news'>
                        <img
                          className='object-cover object-center rounded-t'
                          src={`/assets/${news.mainImg}`}
                          alt=''
                        />
                        <p className='font-medium px-2 pb-3'>{news.headline}</p>
                      </a>
                    </Link>
                  ))
                ) : (
                  <div>
                    <p className='font-medium text-gray-600 mt-5 text-center'>
                      No data
                    </p>
                  </div>
                )}
              </div>
              <div className='flex justify-end mt-5'>
                <button
                  onClick={() => {
                    setSkip((prev) => prev + 9);
                    getRelatedNews(news.category, skip);
                  }}
                  className='btn btn-primary'
                >
                  Load More
                </button>
              </div>
            </section>
            <LergeAdd
              picture={`/ads/${ads?.long[2].adImg || ""}`}
              link={ads?.long[2].url}
            />
          </section>
        </section>

        {/* side bar */}
        <CategoryDetailsSideBar page={"details"} />
      </section>
    </div>
  );
};

export default Details;
