import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";

const categories = ["Tablet", "Capsule", "Syrup", "Injection", "Cream"];

const AddAdvertiseModal = ({ isOpen, closeModal }) => {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload image to Cloudinary
      const image_url = await imageUpload(data.image[0]);

      // 2️⃣ Send normal JSON to backend
      const advertiseData = {
        medicineName: data.medicineName,
        category: data.category,
        description: data.description,
        image: image_url,
        seller_Info: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      };

      const res = await axiosSecure.post("/advertise", advertiseData);

      console.log("Advertisement Data-->", res.data);
      reset();
      setPreview(null);
      Swal.fire({
        title: "Success",
        text: "Advertise successfully added!",
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

    reset();
    setPreview(null);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
              <DialogTitle className="text-lg font-semibold text-gray-800">Create Advertisement</DialogTitle>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                {/* Medicine Name */}
                <div>
                  <label className="text-sm font-medium">Medicine Name</label>
                  <input
                    type="text"
                    // value={products.itemName}
                    {...register("medicineName", { required: "This Filed is Required" })}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring"
                    placeholder="Medicine Name"
                  />
                  {errors.medicineName && <p className="text-xs font-semibold text-red-500">{errors.medicineName.message}</p>}
                </div>
                {/* Medicine Category */}
                <div>
                  <label className="block my-2 text-sm font-medium">Category</label>
                  <select className="w-full p-2 border-0 border-black outline" {...register("category", { required: true })}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="error">Category is required</p>}
                </div>

                {/* Short Description */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    {...register("description", { required: "This Filed is Required" })}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring"
                    placeholder="Ask For Advertisement"
                    rows={3}
                  />
                  {errors.description && <p className="text-xs font-semibold text-red-500">{errors.description.message}</p>}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium">Advertisement Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "This Filed is Required" })}
                    onChange={handleImageChange}
                    className="w-full mt-1"
                  />
                  {errors.image && <p className="text-xs font-semibold text-red-500">{errors.image.message}</p>}
                  {preview && <img src={preview} alt="preview" className="object-cover w-full h-32 mt-2 rounded" />}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm bg-gray-200 rounded btn">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 text-sm text-white bg-blue-600 rounded cursor-pointer btn not-even:px-4 hover:bg-blue-700"
                  >
                    Publish Ad
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddAdvertiseModal;
