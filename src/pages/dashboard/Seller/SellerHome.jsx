import { FaDollarSign, FaBoxOpen } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";
const SellerHome = () => {
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ["statData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/seller-home");
      return data;
    },
  });

  console.log(statData);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 md:mt-0">
      <Helmet>
        <title>Medicine Selling | Seller Home</title>
      </Helmet>
      <div>
        <h1 className="text-xl font-semibold">Seller Dashboard</h1>
        <p className="pb-2 text-gray-400">Overview of sales revenue and order status.</p>
      </div>
      {/* small cards */}
      <div className="grid mt-10 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Pending*/}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
          >
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block font-sans text-lg antialiased font-medium leading-normal text-blue-gray-600">Total Pending</p>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {statData.totalPending}
            </h4>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
          >
            <FaBoxOpen className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block font-sans text-lg antialiased font-medium leading-normal text-blue-gray-600">Total Bookings</p>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {statData.totalBookings}
            </h4>
          </div>
        </div>
        {/* Total Products */}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
          >
            <MdLocalPharmacy className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block font-sans text-lg antialiased font-medium leading-normal text-blue-gray-600">Total Products</p>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {statData.totalProducts}{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
