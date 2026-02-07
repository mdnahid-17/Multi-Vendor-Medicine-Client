import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);

  // Helper function to calculate sale price
  const calculateSalePrice = (price, discount) => {
    if (!price || !discount) return 0;
    return Math.round(Number(price) - (Number(price) * Number(discount)) / 100);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/discount-products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching discount products:", err);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0)
    return <p className="mt-10 text-center text-gray-500">No discount products available.</p>;

  return (
    <div className="px-4 py-10 md:px-8 lg:px-16">
      <h2 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        Discount Products
      </h2>
      <p className="mb-10 text-center text-gray-600 md:text-lg">
        Save more with special discounts on top-quality medicines.
      </p>

      {/* Grid for promotion + Swiper */}
      <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Promo card */}
        <div className="flex-col justify-center w-1/2 p-6 shadow-lg lg:w-full lg:flex over-hidden bg-red-50 rounded-2xl">
          <h3 className="mb-2 text-3xl font-bold text-red-600 lg:w-full md:text-3xl">
            Hot Deals Up <span className="text-red-800">45%</span> Off
          </h3>
          <p className="font-semibold text-gray-700 md:text-lg">Hurry Up! Offer ends soon</p>
        </div>

        {/* Swiper cards */}
        <div className="w-1/2 max-w-md mx-6 lg:w-full">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {products.map((p) => {
              const salePrice = calculateSalePrice(p.price_per_unit, p.discount);

              return (
                <SwiperSlide key={p._id} className="rounded-2xl">
                  <div className="flex-col items-center p-4 overflow-hidden transition-all duration-300 bg-white border border-gray-500 shadow-lg xs:flex rounded-2xl hover:shadow-2xl">
                    <img
                    // className="w-full max-w-md mx-auto"
                      src={p.image}
                      alt={p.name}
                      className="object-contain w-full h-48 mb-3 md:h-52 rounded-xl"
                    />

                    <h3 className="text-lg font-semibold md:text-xl">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.category}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-red-500 md:text-xl">${salePrice}</span>
                      <span className="text-gray-400 line-through">${p.price_per_unit}</span>
                      <span className="px-2 text-xs text-green-600 bg-green-100 rounded-full md:text-sm">
                        {p.discount}% OFF
                      </span>
                    </div>

                    <button className="py-2 mt-4 text-white transition-colors duration-300 bg-blue-600 rounded-lg lg:w-full hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
