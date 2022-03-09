import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../card/card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";

export default function App({peliculas, color10, setSelected, open}) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={false}
        className="mySwiper"
      >
    {
        peliculas?.map((p)=>{
            return <SwiperSlide key={p.id}><Card key={p.id} pelicula={p} color10={color10} setSelected={setSelected} open={open} /></SwiperSlide>
        })
    }
      </Swiper>
    </>
  );
}