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

export default function App({peliculas, color10}) {
  return (
    <>
      <Swiper
        slidesPerView={5}
        centeredSlides={false}
        spaceBetween={-500}
        grabCursor={true}

        pagination={false}
        modules={[Pagination]}
        className="mySwiper"
      >
    {
        peliculas?.map((p)=>{
            return <SwiperSlide key={p.id}><Card key={p.id} pelicula={p} color10={color10} /></SwiperSlide>
        })
    }
      </Swiper>
    </>
  );
}
