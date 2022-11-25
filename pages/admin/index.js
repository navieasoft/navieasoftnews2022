import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../components/context/useStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/admin/AdminLayout";

const Admin = () => {
  const [postReport, setPostReport] = useState(null);
  const [viewsReport, setViewsReport] = useState(null);
  const [news, setNews] = useState(null);
  const { setError } = useStore();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("/api/news/dashboard", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          setNews(result.someNews);
          setPostReport(result.postReport);
          setViewsReport(result.viewerReport);
        } else throw result;
      } catch (error) {
        setError(true);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout>
      <div className='dashboard-container'>
        <h3 className='mt-5'>Post Report</h3>
        <div className='post-details'>
          {postReport &&
            postReport.length &&
            postReport.map((item, i) => (
              <div className='item' key={i}>
                <div className='flex justify-center items-center gap-1 font-bold'>
                  <p className='text-xl'>{item.count}</p>
                  <p className='text-green-800 ml-2'>
                    {Math.ceil(item.grouth)}%
                  </p>
                  {Math.sign(item.grouth) === 1 ? (
                    <FontAwesomeIcon icon={faArrowUpShortWide} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDownShortWide} />
                  )}
                </div>
                <p className='text-gray-600'>{item.name}</p>
              </div>
            ))}
        </div>
        <h3 className='mt-5'>Visitors Report</h3>
        <div className='post-details'>
          {viewsReport &&
            viewsReport.map((item, i) => (
              <div className='item' key={i}>
                <div className='flex justify-center items-center gap-1 font-bold'>
                  <p className='text-xl'>{item.count}</p>
                  <p className='text-green-900'>{Math.ceil(item.grouth)}%</p>
                  {Math.sign(item.grouth) === 1 ? (
                    <FontAwesomeIcon icon={faArrowUpShortWide} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDownShortWide} />
                  )}
                </div>
                <p className='text-gray-600'>{item.name}</p>
              </div>
            ))}
        </div>

        <h3 className='mt-12'>Some Latest News</h3>
        <div className='allnews-container w-full mt-2 cursor-pointer overflow-auto'>
          <table className='w-full' onClick={() => router.push("/admin/news")}>
            <thead>
              <tr>
                <th>Headline</th>
                <th>Category</th>
                <th>Sub</th>
                <th>Editor_name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {news &&
                news.map((news, i) => (
                  <tr key={i}>
                    <td>
                      {news.headline.slice(0, 50)}{" "}
                      {news.headline.length > 50 && "..."}
                    </td>
                    <td>{news.category_name}</td>
                    <td>{news.sub_category_name}</td>
                    <td>{news.editor_name}</td>
                    <td>{news.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
