import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";
import classNames from "classnames";

const CategoryModal = ({ isOpen, closeModal, refetch }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  // console.log(import.meta.env.VITE_API_URL);
  const imageUrl = watch("imageUrl");
  const imageFile = watch("imageFile");

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload image to Cloudinary
      const image_url = await imageUpload(data.imageFile[0]);

      // 2️⃣ Send normal JSON to backend
      const categoryData = {
        categoryName: data.categoryName,
        itemName: data.itemName,
        image: image_url,
      };

      const res = await axiosSecure.post("/categories", categoryData);

      console.log("Saved:", res.data);
      reset();
      refetch();
      closeModal();

      Swal.fire({
        title: "Success",
        text: "Category successfully added!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
            <DialogTitle className="mb-4 text-lg font-semibold">Create Category</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block mb-1 text-sm font-medium">Category Name</label>

                <select
                  id="categoryName"
                  className={classNames("w-full border border-gray-400 rounded-md p-2 text-xl mb-3 outline-none", {
                    "is-invalid": errors.categoryName,
                  })}
                  {...register("categoryName", { required: true })}
                >
                  <option value="">-- Select Category --</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                  <option value="Cream">Cream</option>
                  <option value="Cream">Others</option>
                </select>
                {errors.categoryName && <p className="mt-1 text-sm text-red-500">{errors.categoryName.message}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-1 text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  {...register("itemName", { required: "Category name is required" })}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                />
                {errors.itemName && <p className="mt-1 text-sm text-red-500">{errors.itemName.message}</p>}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageFile", {
                    validate: () => (imageUrl || imageFile?.length ? true : "Image URL or Image file is required"),
                  })}
                  className="w-full text-sm"
                />
              </div>

              {(errors.imageUrl || errors.imageFile) && (
                <p className="text-sm text-red-500">{errors.imageUrl?.message || errors.imageFile?.message}</p>
              )}

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
  );
};

export default CategoryModal;
