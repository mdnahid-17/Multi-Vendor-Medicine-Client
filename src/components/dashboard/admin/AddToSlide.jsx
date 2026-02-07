import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../api/utils";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Banner from "../../Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";

const AddToSlide = () => {
  const [imagePreview, setImagePreview] = useState();
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const imageFile = watch("imageFile");

  const {
    data: bannerSliders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bannerSliders"],
    queryFn: async () => {
      const { data } = await axiosSecure("/banner-sliders");
      return data;
    },
  });

  // create banner slider
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
  // banner slider remove
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/banner-slide/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      Swal.fire({
        title: "Success",
        text: "Slider Successfully Delete!",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
  });

  //  Handle Delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="max-w-full mx-auto overflow-hidden lg:max-w-4xl">
      <Helmet>
        <title>Medicine Selling | Add To Slide</title>
      </Helmet>
      <h2 className="text-2xl font-semibold">Add To Slide</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
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
        <div>
          <img src={imagePreview} alt="Preview" className="h-40 border rounded-lg" />
        </div>
      )}
      {/*  slider */}

      <div>
        <Banner deletable={true} bannerSliders={bannerSliders || []} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AddToSlide;
