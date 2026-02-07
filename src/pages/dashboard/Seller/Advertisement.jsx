import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import AddAdvertiseModal from "../../../components/modal/AddAdvertiseModal";
import { Helmet } from "react-helmet";

const Advertisement = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/products/${user?.email}`);

      return data;
    },
  });
  console.log(products);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="mt-12 md:mt-0 w-full max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto overflow-hidden">
      <Helmet>
        <title>Medicine Selling | Advertisement</title>
      </Helmet>
      <h1 className="text-xl font-semibold">Advertisement Sliders</h1>
      <p className="pb-2 text-gray-400">Overview of Advertisement Sliders status.</p>

      <div>
        {
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item._id} className="mySwiper">
                <div className="p-4 border rounded-lg">
                  <img src={item.image} alt={item.itemName} className="h-40 mx-auto" />
                  <div>
                    <h3 className="mt-2 font-semibold">Name: {item.itemName}</h3>
                    <h3 className="mt-2 font-semibold">Category: {item.category}</h3>
                    <h3 className="mt-2 font-semibold">Company: {item.company}</h3>
                    <h3 className="mt-2 font-semibold">Seller E-mail: {item.seller_Info.email}</h3>
                    <p className="text-xs font-semibold text-gray-400">Description: {item.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-green-600">Price: ${item.price_per_unit}</p>
                      <button className="btn btn-dash btn-accent" onClick={() => setIsOpen(!isOpen)}>
                        Add Advertise
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        }
      </div>

      {/* add advertise content */}
      <AddAdvertiseModal products={products} isOpen={isOpen} closeModal={() => setIsOpen(false)} />

      {products.length === 0 && (
        <div className="py-6 text-center">
          <h3 className="text-2xl font-semibold">No Products For This User</h3>
          <p className="text-gray-400">Please Give Me Add Products and Sells The Products By Users Earn Money </p>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
