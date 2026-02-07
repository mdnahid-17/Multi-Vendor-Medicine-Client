import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import CategoryModal from "../../../components/modal/CategoryModal";
import Swal from "sweetalert2";
import CategoryUpdateModal from "../../../components/modal/CategoryUpdateModal";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const [catData, setCatData] = useState();
  // get all categories
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/categories`);
      // setCatData(data)
      return data;
    },
  });

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/category/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      Swal.fire("Deleted!", "Category removed.", "success");
    },
  });

  //  Handle Delete
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This category will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;
      await mutateAsync(id);
      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted successfully.",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 lg:mt-0">
      <Helmet>
        <title>Medicine Selling | Management Category</title>
      </Helmet>
      <h1 className="text-xl font-semibold">Category Management</h1>
      <p className="mb-2 text-gray-400">Overview of Category Management status.</p>
      <div className="overflow-x-auto lg:mx-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg lg:text-xl">No.</th>
              <th className="text-lg lg:text-xl">Category</th>
              <th className="text-lg lg:text-xl">Name</th>
              <th className="text-lg text-center lg:text-xl">Image</th>
              <th className="text-lg lg:text-xl">Delete</th>
              <th className="text-lg lg:text-xl">Edit</th>
              <th className="text-lg lg:text-xl">
                <button className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
                  <IoMdAdd size={20} /> New
                </button>
              </th>
            </tr>
          </thead>
          {categories.map((c, idx) => {
            const { _id, itemName, categoryName, image } = c;
            return (
              <tbody key={_id}>
                <tr className="transition border-b border-gray-200 cursor-pointer hover:bg-blue-100">
                  <th className="my-6 text-base text-center md:block">{idx + 1}</th>
                  <td className="text-xl font-semibold ">{categoryName}</td>
                  <td className="text-xl font-semibold ">{itemName}</td>
                  <td className="text-xl font-semibold">
                    <a href={image} target="-blank">
                      <img src={image} alt={itemName} className="w-[150px] h-[100px] object-contain" />
                    </a>
                  </td>
                  <td className="text-xl font-semibold text-center cursor-pointer">
                    <button
                      className="mx-auto text-center"
                      onClick={() => {
                        handleDelete(_id);
                      }}
                    >
                      <MdDeleteForever size={30} className="mx-auto text-center hover:text-red-500" />
                    </button>
                  </td>
                  <td className="text-xl font-semibold text-center cursor-pointer">
                    <button
                      // className="text-2xl"
                      onClick={() => {
                        setCatData(c); // ✅ pass clicked row
                        setIsEditModalOpen(true);
                      }}
                    >
                      <MdEdit size={25} className="mx-auto" />
                    </button>
                  </td>
                  <td className="text-lg font-semibold text-center">
                    <button className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
                      <IoMdAdd size={20} /> New
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {/* Add Category Modal */}
      <div>
        <CategoryModal isOpen={isOpen} refetch={refetch} closeModal={() => setIsOpen(false)} />
      </div>
      {/* category update */}
      <CategoryUpdateModal
        // category={selectedCategory}
        setCatData={setCatData}
        catData={catData}
        refetch={refetch}
        isEditOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        setIsEditModalOpen={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ManageCategory;
