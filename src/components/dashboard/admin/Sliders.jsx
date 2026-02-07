import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const Sliders = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

   const { data: bannerSliders, isLoading } = useQuery({
      queryKey: ["bannerSliders"],
      queryFn: async () => {
        const { data } = await axiosSecure("/banner-sliders");
  
        return data;
      },
    });
    console.log(bannerSliders);

      if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="w-full overflow-hidden border border-red-600 ">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          marginBottom: 3,
        }}
        spaceBetween={10}
        navigation={true}
        watchSlidesProgress={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {bannerSliders.map((item) => (
          <SwiperSlide key={item._id} className="mySwiper">
            <img src={item.image_url} alt={item.itemName} className="object-cover w-full border border-red-600" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 2nd */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {bannerSliders.map((item) => (
          <SwiperSlide key={item._id} className="mySwiper">
            <img src={item.image_url} alt={item.itemName} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
