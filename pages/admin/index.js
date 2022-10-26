import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/admin/common/header";
import SideBar from "../../components/admin/common/SideBar";

const Admin = () => {
  const router = useRouter();

  const postDetails = [
    { range: "Today's Post", count: 17 },
    { range: "This Month's Post", count: 55 },
    { range: "This year's Post", count: 103 },
  ];
  const visitors = [
    { range: "Today's Visitors", count: 17 },
    { range: "This Month's Visitors", count: 55 },
    { range: "This year's Visitors", count: 103 },
  ];
  const data = [
    {
      _id: 1,
      mainImg: "/topnews.png",
      category: "World News",
      editorName: "Ahmed kader",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 2,
      mainImg: "/topnews.png",
      category: "U.S News",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 3,
      mainImg: "/topnews.png",
      category: "Politics",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 4,
      mainImg: "/topnews.png",
      category: "New York",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 5,
      mainImg: "/topnews.png",
      category: "Business",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 6,
      mainImg: "/topnews.png",
      category: "Technology",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 7,
      mainImg: "/topnews.png",
      category: "Science",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 8,
      mainImg: "/topnews.png",
      category: "sports",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
    {
      _id: 9,
      mainImg: "/topnews.png",
      category: "Health",
      subCategory: "Asia",
      date: "18 october, 2022 12:18",
      editorName: "Ahmed kader",
      headline: "Combat Veterans, Eyeing House, Strike From the Right Strike",
      body: "top news Candidates with remarkable military records are embracing the stolen-election myth, challenging the assumption that veterans can foster bipartisanship. Beyond right-wing leanings, they support anti-interventionist foreign policies that for decades have been associated more with the Democratic left than the G.O.P.",
    },
  ];

  return (
    <section className='bg-gray-100'>
      <Header />
      <main className='flex gap-5'>
        <SideBar />
        <div className='dashboard-container'>
          <h3 className='mt-5'>Post Report</h3>
          <div className='post-details'>
            {postDetails.map((item, i) => (
              <div className='item' key={i}>
                <div className='flex justify-center items-center gap-1 font-bold'>
                  <p className='text-xl'>{item.count}</p>
                  <p className='text-green-800'>+4.5%</p>
                  <FontAwesomeIcon icon={faArrowUpShortWide} />
                </div>
                <p className='text-gray-600'>{item.range}</p>
              </div>
            ))}
          </div>
          <h3 className='mt-5'>Visitors Report</h3>
          <div className='post-details'>
            {visitors.map((item, i) => (
              <div className='item' key={i}>
                <div className='flex justify-center items-center gap-1 font-bold'>
                  <p className='text-xl'>{item.count}</p>
                  <p className='text-green-900'>+4.5%</p>
                  <FontAwesomeIcon icon={faArrowUpShortWide} />
                </div>
                <p className='text-gray-600'>{item.range}</p>
              </div>
            ))}
          </div>

          <h3 className='mt-12'>Some Latest News</h3>
          <div className='allnews-container w-full mt-2 cursor-pointer'>
            <table onClick={() => router.push("/admin/news")}>
              <thead>
                <tr>
                  <th>Headline</th>
                  <th>Category</th>
                  <th>Editor_name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((news, i) => (
                  <tr key={i}>
                    <td>
                      {news.headline.slice(0, 200)}{" "}
                      {news.headline.length > 200 && "..."}
                    </td>
                    <td>{news.category}</td>
                    <td>{news.editorName}</td>
                    <td>{news.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Admin;
