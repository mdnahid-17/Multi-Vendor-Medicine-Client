import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

import syrup from "../assets/CoughShield-Syrup.jpg";
import capsule from "../assets/amoxicillin.jpg";
import injection from "../assets/Insulin-RapidPen.jpg";
import tablet from "../assets/Multivitamin-Complex.png";
import cream from "../assets/SkinSooth-Cream.jpg";
import others from "../assets/Glucose-Drip.jpg";

const Cards = () => {
  return (
    <div className="py-6 lg:py-10">
      <h3 className="text-2xl font-bold text-center capitalize"> Shop by categories</h3>
      <p className="text-center text-gray-500 lg:w-1/2 lg:mx-auto">
        Find all your health and wellness needs — from medicines and baby care to vitamins, skin care, and first-aid essentials —
        in one place.”
      </p>
      <div className="py-10 mx-10 ">
        <Swiper
          slidesPerView={4}
          spaceBetween={6}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1.3, spaceBetween: 8 },
            640: { slidesPerView: 1.5, spaceBetween: 12 },
            768: { slidesPerView: 2.4, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to={"/subCategory/syrup"}>
              <div className="w-2/3 mx-4 text-center border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover w-4/5 py-4 mx-auto lg:py-1" src={syrup} />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: syrup</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"/subCategory/capsule"}>
              <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover w-4/5 py-4 mx-auto lg:py-7" src={capsule} alt="" />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: capsule</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"subCategory/injection"}>
              <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover w-2/3 p-4 mx-auto lg:p-8" src={injection} alt="" />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: injection</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"subCategory/tablet"}>
              <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover w-4/5 py-2 mx-auto lg:p-3" src={tablet} alt="" />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: tablet</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"subCategory/cream"}>
              <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover w-4/5 py-2 mx-auto lg:p-3" src={cream} alt="" />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: cream</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"subCategory/others"}>
              <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
                <img className="object-cover py-8 mx-auto lg:py-12" src={others} alt="" />
                <div className="text-center">
                  <h4 className="pb-2 text-base lg:text-xl">Category: others</h4>

                  <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Cards;
