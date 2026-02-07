import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";

const BannerAdvertiseSlider = () => {
  const { data: advertises, isLoading } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/advertises`);

      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Helmet>
        <title>Medicine Selling | Banner Advertise Slider</title>
      </Helmet>
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {advertises.map((item) => (
          <div key={item._id} className="shadow-md bg-base-100">
            <figure>
              <img src={item.image} alt={item.title} className="object-cover w-full " />
            </figure>
            <div className="p-4 ">
              <div className="flex items-center justify-around">
                <h2 className="text-sm ">Name {item.medicineName}</h2>
                <div
                  className={`${item.category === "Tablet" && "p-4 badge bg-yellow-100/60 text-yellow-500"} ${
                    item.category === "Capsule" && "p-4 badge bg-blue-100/60 text-blue-500"
                  } ${item.category === "Syrup" && "p-4 badge bg-emerald-100/60 text-emerald-500"} ${
                    item.category === "Injection" && "p-4 badge bg-red-100/60 text-red-500"
                  }
                          ${item.category === "Cream" && "p-4 badge bg-fuchsia-400/40 text-secondary"}`}
                >
                  Category :{item.category}
                </div>
              </div>
              <h2>seller {item.seller_Info.email}</h2>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {!advertises && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold ">NO Advertises</h2>
          <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, consequuntur.</p>
        </div>
      )}
    </div>
  );
};

export default BannerAdvertiseSlider;
