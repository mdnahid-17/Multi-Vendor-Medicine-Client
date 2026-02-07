import { Swiper, SwiperSlide } from "swiper/react";
import brand1 from "../assets/Brand_1.png";
import brand2 from "../assets/Brand_2.png";
import brand3 from "../assets/Brand_3.png";
import brand4 from "../assets/Brand_4.png";
import brand5 from "../assets/Brand_5.png";
import brand6 from "../assets/Brand_6.png";
import brand7 from "../assets/Brand_7.png";

const ShopBrand = () => {
  return (
    <div className="bg-[#F4F7FC] py-6">
      <div className="py-4">
        <h3 className="text-2xl font-semibold text-center">Shop By Brand</h3>
        <p className="mx-auto text-center text-gray-500 lg:w-1/2">
          Discover trusted, high-quality medicines from the world’s leading brands — all in one place.
        </p>
      </div>

      <div className="lg:mx-8">
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          watchSlidesProgress={true}
          slidesPerView={5}
          className="mySwiper"
        >
          <SwiperSlide>
            <div>
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ShopBrand;
