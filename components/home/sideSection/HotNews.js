/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Markup } from "interweave";

const HotNews = ({ data }) => {
  if (!data) return null;
  return (
    <Link href={`/details?id=${data.id}`}>
      <a className='hot-new-container'>
        <img
          className='object-contain h-52 w-full'
          src={`/assets/${data.image}`}
          alt='news'
        />
        <h3>{data.headline}</h3>
        <Markup content={`${data.body.slice(0, 100)}...`} />
      </a>
    </Link>
  );
};

export default HotNews;
