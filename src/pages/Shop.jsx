import { useState } from "react";
import { axiosCommon } from "../hooks/useCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";
import MedicinesRows from "../components/dashboard/TableRows/MedicinesRows";
import CardDetailsModal from "./CardDetailsModal";
import { Helmet } from "react-helmet";

const Shop = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open Modal Product
  const openModal = (product) => {
    setSelectedProduct(product); // store selected product
    setIsOpen(true); // open modal
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", filter, search, sort],
    queryFn: async () => {
      const params = {};
      if (filter) params.filter = filter;
      if (search) params.search = search;
      if (sort) params.sort = sort;

      const res = await axiosCommon("/all-products", { params });
      return res.data;
    },
  });

  const { data: countData } = useQuery({
    queryKey: ["products-count", filter, search],
    queryFn: async () => {
      const params = {};
      if (filter) params.filter = filter;
      if (search) params.search = search;

      const res = await axiosCommon("/products-count", { params });
      return res.data;
    },
  });

  // reset button
  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };
  // handle search button
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading products</p>;
  console.log(search);
  console.log(countData);
  console.log(products);

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <Helmet>
        <title>Medicine Selling | Shop</title>
      </Helmet>
      {/* header section */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row ">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
            name="category"
            id="category"
            className="p-4 border rounded-lg"
          >
            <option value="">Filter By Category</option>
            <option value="syrup">syrup</option>
            <option value="capsule">capsule</option>
            <option value="injection">injection</option>
            <option value="tablet">tablet</option>
            <option value="cream">cream</option>
            <option value="others">others</option>
          </select>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Enter Products Title"
              aria-label="Enter Products Title"
            />

            <button className="px-1 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-500 rounded-md md:px-4 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
        <div>
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
            name="sort"
            id="sort"
            className="p-4 border rounded-md"
          >
            <option value="">Sort By Deadline</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <button onClick={handleReset} className="text-red-500 border hover:border-red-600 btn">
          Reset
        </button>
      </div>
      {/* Cards  */}
      <div
        className="mt-4"
        // className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div className="overflow-x-auto lg:mx-10">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-gray-200">
              <tr>
                <th className="text-lg lg:text-xl">No.</th>
                <th className="text-lg lg:text-xl">Category</th>
                <th className="text-lg lg:text-xl">Name</th>
                <th className="text-lg lg:text-xl">Image</th>
                <th className="text-lg lg:text-xl">Price Per Unit</th>
                <th className="text-lg lg:text-xl">Company</th>
                <th className="text-lg text-center lg:text-xl">Cart</th>
                <th className="text-lg lg:text-xl">Details</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {products.map((product, idx) => {
                return <MedicinesRows key={product._id} idx={idx} openModal={openModal} product={product} refetch={refetch} />;
              })}
            </tbody>
          </table>
        </div>
        {/* Cart Details */}
        <CardDetailsModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} product={selectedProduct} />
      </div>
      {/* pagination  */}
    </div>
  );
};

export default Shop;
