import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { MdDeleteForever } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import LoadingSpinner from "../shared/LoadingSpinner";

const Banner = ({ deletable, handleDelete }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: bannerSliders = [], isLoading } = useQuery({
    queryKey: ["bannerSliders"],
    queryFn: async () => {
      const { data } = await axiosSecure("/banner-sliders");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(bannerSliders);

  return (
    <div className="relative">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          marginBottom: 3,
        }}
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {bannerSliders.map((item) => (
          <SwiperSlide key={item._id} className="mySwiper">
            <img src={item.image_url} alt={item.itemName} className="object-cover w-full h-full rounded-lg" />
            {deletable && (
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute z-20 p-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-700 top-1 right-1"
              >
                <MdDeleteForever size={20} className="text-white" />
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 2nd */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {bannerSliders.map((item) => (
          <SwiperSlide key={item._id} className="mySwiper">
            <img src={item.image_url} alt={item.itemName} className="object-cover w-full h-full" />
            {deletable && (
              <div
                onClick={() => handleDelete(item._id)}
                className="absolute top-0 right-0 z-20 p-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-700 sm:top-1 sm:right-1"
              >
                <MdDeleteForever size={20} className="text-white" />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
