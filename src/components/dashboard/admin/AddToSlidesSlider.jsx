import { useForm } from "react-hook-form";
import { imageUpload } from "../../../api/utils";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Sliders from "./Sliders";


const AddToSlidesSlider = () => {

  const [imagePreview, setImagePreview] = useState();
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const imageFile = watch("imageFile");

  const onSubmit = async (data) => {
    const image_url = await imageUpload(data.imageFile[0]);
    try {
      const { data } = await axiosSecure.post("/banner-slider", { image_url });
      console.log("Banner Slider-->", data);
      reset();
      setImagePreview(null);
      Swal.fire({
        title: "Success",
        text: "Category successfully added!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.log(err.message);
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
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept="image/*"
            className="p-2 input"
            {...register("imageFile", {
              validate: () => (imageFile?.length ? true : "Image URL or Image file is required"),
            })}
            onChange={handleImageChange}
          />
          {errors.imageFile && <p className="error">Image is required</p>}
          <button type="submit" className="btn btn-primary">
            Save Image
          </button>
        </form>
        {/* Image Preview */}
        {imagePreview && (
          <div className="md:col-span-2">
            <img src={imagePreview} alt="Preview" className="h-40 border rounded-lg" />
          </div>
        )}
      </div>

      {/* Sliders show  */}
      <div className="border border-red-400 ">
       <Sliders />
      </div>
    </>
  );
};

export default AddToSlidesSlider;
