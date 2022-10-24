import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faLink, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import SmallAdd from "../components/common/advertizer/SmallAd";
import ScrollingHighlight from "../components/common/ScrollingHighlight";
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
import { basicData } from "../services/client/basicData";
import LergeAdd from "../components/common/advertizer/LergeAdd";
import TopMenus from "../components/common/TopMenus";
import Link from "next/link";
import CategoryDetailsSideBar from "../components/common/CategoryDetailsSideBar";

const Details = () => {
  const [linkCopy, setLinkCopied] = useState(false);
  const router = useRouter();
  const { baseUrl, siteName } = basicData();

  function handleCopyLink() {
    setLinkCopied(true);
    navigator.clipboard.writeText(baseUrl + router.asPath);
  }

  const data = {
    _id: 1,
    img: "/dummy6.png",
    editor: "Online Reporter",
    editor_name: "Asraful",
    related_topic: ["Asia", "Bangladesh", "Dhaka"],
    imgCaption:
      "People sheltering in a subway station in Kyiv after a series of early-morning attacks. Brendan Hoffman for The New York Times",
    heading:
      "Listen to the 'This American Life' Listen to the 'This American Life' Listen to the 'This American Life' Listen to the 'This American Life'",
    body: "Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
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

  return (
    <div className='mb-10'>
      <TopPart page='details' />
      <TopMenus />
      <ScrollingHighlight />

      <LergeAdd picture={"/longadd.png"} />

      <section className='details-page-content-wrapper'>
        <section className='col-span-2 print:col-span-3'>
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
              <h3>{data.heading}</h3>
              <p className='text-lg my-5 space-x-2'>
                <FontAwesomeIcon className='text-gray-600' icon={faEdit} />
                <span>{data.editor}</span>
              </p>
              <Image
                className='object-contain'
                width={900}
                height={300}
                src={data.img}
                alt='news image'
              />
              <div className='w-3/4 mx-auto'>
                <p className='text-center text-sm text-gray-500'>
                  {data.imgCaption}
                </p>
              </div>

              <p className='text-justify mt-10 text-xl'>{data.body}</p>

              <p className='mt-10 text-xl'>
                {siteName}/{data.editor_name}
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
                {data.related_topic.map((tp, i) => (
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
