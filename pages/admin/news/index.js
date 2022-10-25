import {
  faAngleLeft,
  faEdit,
  faEllipsis,
  faEllipsisVertical,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const Allnews = () => {
  const [showMenu, setShowMenu] = useState(-1);
  const router = useRouter();

  function handleDelete(id) {
    const confirm = window.confirm("Are you sure to delete?");
    if (confirm) {
      console.log("deleted");
    }
  }

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
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5 overflow-auto'>
        <div className='w-[200px]'>
          <SideBar />
        </div>

        <div className='allnews-container'>
          <table>
            <thead>
              <tr>
                <th>Headline</th>
                <th>Category</th>
                <th>Editor_name</th>
                <th>Date</th>
                <th></th>
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
                  <td className='space-x-2 relative'>
                    <button onClick={() => setShowMenu(i)} className='w-5'>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <div
                      className={`controll-menus ${
                        showMenu === i ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() =>
                          router.push("/admin/news/updatenews?id=id")
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => router.push("/details?id=id")}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button onClick={() => handleDelete("id")}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='btn-group flex justify-end my-3 mx-4'>
            <button className='btn'>«</button>
            <button className='btn'>Page 1</button>
            <button className='btn'>»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allnews;
