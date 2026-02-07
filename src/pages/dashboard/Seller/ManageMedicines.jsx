import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";

const categories = ["tablet", "capsule", "syrup", "injection", "cream", "others"];
const companies = ["Square", "Beximco", "Incepta", "ACI", "Renata"];

const ManageMedicines = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      discount: 0,
    },
  });
  const imageFile = watch("imageFile");
  const onSubmit = async (data) => {
    console.log("Medicine Data:", data);
    try {
      // 1️⃣ Upload image to Cloudinary
      const image_url = await imageUpload(data.imageFile[0]);

      // 2️⃣ Send normal JSON to backend
      const productData = {
        itemName: data.itemName,
        genericName: data.genericName,
        category: data.category,
        company: data.company,
        massUnit: data.massUnit,
        price_per_unit: data.price_per_unit,
        description: data.description,
        discount: data.discount,
        image: image_url,
        seller_Info: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      };

      const res = await axiosSecure.post("/product", productData);

      console.log("Saved:", res.data);
      reset();
      setImagePreview(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-5xl p-6 mx-auto mt-10 bg-white shadow lg:mt-0 rounded-xl">
      <Helmet>
        <title>Medicine Selling | Manage Medicines</title>
      </Helmet>
      <h2 className="mb-6 text-2xl font-bold">Manage Medicines</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Item Name */}
        <div>
          <label className="label">Item Name *</label>
          <input type="text" className="input" {...register("itemName", { required: "Item name is required" })} />
          {errors.itemName && <p className="error">{errors.itemName.message}</p>}
        </div>

        {/* Generic Name */}
        <div>
          <label className="label">Generic Name *</label>
          <input
            type="text"
            className="input"
            {...register("genericName", {
              required: "Generic name is required",
            })}
          />
          {errors.genericName && <p className="error">{errors.genericName.message}</p>}
        </div>
        {/* Category */}
        <div>
          <label className="label">Category *</label>
          <select className="input" {...register("category", { required: true })}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="error">Category is required</p>}
        </div>

        {/* Company */}
        <div>
          <label className="label">Company *</label>
          <select className="input" {...register("company", { required: true })}>
            <option value="">Select Company</option>
            {companies.map((comp) => (
              <option key={comp}>{comp}</option>
            ))}
          </select>
          {errors.company && <p className="error">Company is required</p>}
        </div>

        {/* Mass Unit */}
        <div>
          <label className="label">Item Mass Unit *</label>
          <select className="input" {...register("massUnit", { required: true })}>
            <option value="">Select Unit</option>
            <option value="MG">MG</option>
            <option value="ML">ML</option>
          </select>
          {errors.massUnit && <p className="error">Unit is required</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Per Unit Price *</label>
          <input
            type="number"
            // step="0.01"
            className="input"
            {...register("price_per_unit", {
              valueAsNumber: true,
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            })}
          />
          {errors.price_per_unit && <p className="error">{errors.price_per_unit.message}</p>}
        </div>

        {/* Discount */}
        <div>
          <label className="label">Discount (%)</label>
          <input
            type="number"
            className="input"
            {...register("discount", {
              min: 0,
              max: 100,
            })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Medicine Image *</label>
          <input
            type="file"
            accept="image/*"
            className="input"
            {...register("imageFile", {
              validate: () => (imageFile?.length ? true : "Image URL or Image file is required"),
            })}
            onChange={handleImageChange}
          />
          {errors.image && <p className="error">Image is required</p>}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="md:col-span-2">
            <img src={imagePreview} alt="Preview" className="h-40 border rounded-lg" />
          </div>
        )}

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Short Description *</label>
          <textarea
            rows="4"
            className="w-full input"
            {...register("description", {
              required: "Description is required",
              maxLength: 200,
            })}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button type="submit" className="w-full py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
            Save Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageMedicines;
