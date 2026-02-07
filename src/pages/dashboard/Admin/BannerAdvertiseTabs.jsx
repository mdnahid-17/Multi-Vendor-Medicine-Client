/* eslint-disable no-unused-vars */
import { useState } from "react";
import BannerAdvertiseSlider from "../../../components/dashboard/admin/BannerAdvertiseSlider";
import AddToSlidesSlider from "../../../components/dashboard/admin/AddToSlidesSlider";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Link, Outlet } from "react-router";
import { Helmet } from "react-helmet";

const BannerAdvertiseTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: advertises, isLoading } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/advertises`);

      return data;
    },
  });
  // console.log(advertises);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="w-full mt-14 lg:mt-0">
      <Helmet>
        <title>Medicine Selling | Banner Advertise Tabs</title>
      </Helmet>
      {/* Tabs */}
      <div className="flex overflow-x-auto overflow-y-hidden sm:justify-start flex-nowrap ">
        <div className="flex items-center mb-6 overflow-x-hidden tabs tabs-boxed ">
          <Link
            to={``}
            onClick={() => setTabIndex(0)}
            className={`flex cursor-pointer items-center flex-shrink-0 px-3 py-3 space-x-2 ${
              tabIndex === 0 ? "border border-gray-400 border-b-0" : "border-b border-gray-400"
            }  `}
          >
            <button>Banner Advertise</button>
          </Link>

          <Link
            to={`add-to-slide`}
            onClick={() => setTabIndex(1)}
            className={`flex cursor-pointer items-center flex-shrink-0 px-3 py-3 space-x-2 ${
              tabIndex === 1 ? "border border-gray-400 border-b-0" : "border-b border-gray-400"
            }  `}
          >
            <button>Add To Slides</button>
          </Link>
        </div>
      </div>

      {/* Tab Content */}
      <Outlet />
    </div>
  );
};

export default BannerAdvertiseTabs;
