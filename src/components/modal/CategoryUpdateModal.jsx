import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const CategoryUpdateModal = ({ catData, setCatData, setIsEditModalOpen, isEditOpen, refetch, closeModal }) => {
  const { handleSubmit } = useForm();
  // console.log('category-->',category);

  //   handle Image update
  const handleImage = async (image) => {
    try {
      // upload image
      const updatedCatData = { ...catData, catId: catData._id };
      delete updatedCatData._id;
      const image_url = await imageUpload(image);
      console.log(image_url);
      setCatData({ ...catData, image: image_url });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    // const updatedCatData = Object.assign({}, catData);
    const updatedCatData = { ...catData, catId: catData._id };
    delete updatedCatData._id;
    console.log(updatedCatData);
    try {
      const { data } = await axiosSecure.put(`/categories/update/${catData?._id}`, updatedCatData);
      console.log(data);
      refetch();
      setIsEditModalOpen(false);
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully Updates!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  console.log("catData-->", catData);
  return (
    <div>
      <Transition appear show={isEditOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
              <DialogTitle className="mb-4 text-lg font-semibold">Update Modal</DialogTitle>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Category Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Category Name</label>
                  <input
                    type="text"
                    defaultValue={catData?.categoryName}
                    onChange={(e) => setCatData({ ...catData, categoryName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Item Name</label>
                  <input
                    type="text"
                    defaultValue={catData?.itemName}
                    onChange={(e) => setCatData({ ...catData, itemName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e.target.files[0])}
                    className="w-full text-sm"
                  />
                  {catData?.image && <img src={catData.image} className="w-20 h-20 mt-2 rounded" alt="" />}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm border rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Save Category
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CategoryUpdateModal;
