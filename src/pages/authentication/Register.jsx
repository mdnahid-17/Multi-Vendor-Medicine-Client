import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { MdErrorOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactPasswordChecklist from "react-password-checklist";
import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { imageUpload } from "../../api/utils";
const Register = () => {
  const { loading, setLoading, createUser,updateUserProfile,saveUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ( data) => {
    const {name,image, email, password,role } = data;
    console.log("user role",role);
    try {
      setLoading(true);
      // 1. Upload image and get image url
      const image_url = await imageUpload(image[0]);
      // 2. Create User
     const result =await createUser(email, password);
     console.log(result);
     // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url)
      await saveUser({ email, role });
      Swal.fire({
        title: "Success",
        text: "Sign Up Success Fully !",
        icon: "success",
        confirmButtonText: "ok!",
      })
      navigate('/')
      console.log(role);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "ok!",
      });
    }
  };
  if (loading) {
    return <h1 className="py-4 text-2xl font-semibold text-center">Loading...</h1>;
  }

  return (
    <div className="lg:w-1/2 bg-[#f1f1f1] mx-auto p-10 my-10 rounded-xl">
      <Helmet>
        <title>Medicine Selling | Register</title>
      </Helmet>
      <h1 className="pb-2 text-3xl font-bold text-center text-black">Sign Up</h1>
      <p className="pb-4 text-center text-gray-600">Wel Come to Multi-Vendor Medicine Selling</p>

      <form onSubmit={handleSubmit(onSubmit)} className="container py-5 mx-auto space-y-3">
        <label className="text-xl font-semibold">Name</label>
        <div className="relative">
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.name,
            })}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your name"
            {...register("name", {
              required: "This field is required",
              minLength: {
                value: .3,
                message: "Name at list 3 characters",
              },
            })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.name })}></MdErrorOutline>
        </div>
        {errors.name && <span className="mb-3 text-xl font-semibold text-red-600">{errors.name.message}</span>}
        <br />
        <label className="text-xl font-semibold">Select Image</label>
        <div className="relative">
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.image,
            })}
            type="file"
            name="image"
            accept="image/*"
            {...register("image", { required: true })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.image })}></MdErrorOutline>
        </div>
        {errors.image && <span className="mb-3 text-xl font-semibold text-red-600">This field is required</span>}
        <br />
        <label className="text-xl font-semibold">Select Role</label>
        <div className="relative">
          <select
            id="role"
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.role,
            })}
            {...register("role", { required: true })}
          >
            <option value="">-- Select Role --</option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
          </select>
          <MdErrorOutline className={classNames("error", { "error-icon": errors.role })}></MdErrorOutline>
        </div>
        {errors.role && <span className="mb-3 text-xl font-semibold text-red-600">This field is required </span>}
        <br />
        <label className="text-xl font-semibold">Email</label>
        <div className="relative">
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.email,
            })}
            type="email"
            name="email"
            placeholder="Enter Your email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Enter your valid email address",
              },
            })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.email })}></MdErrorOutline>
        </div>
        {errors.email && <span className="mb-3 text-xl font-semibold text-red-600">{errors.email.message}</span>}
        <br />
        <div className="relative">
          <label className="text-xl font-semibold">Password</label>
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.password,
            })}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onClick={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: "This field is required",
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  "password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters",
              },
            })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.password })}></MdErrorOutline>
          {errors.password && <span className="mb-3 text-xl font-semibold text-red-600">{errors.password.message}</span>}
          <span onClick={() => setShowPassword(!showPassword)} className="absolute text-2xl right-3 top-12">
            {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </span>
          <br />
        </div>
        <ReactPasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
          minLength={8}
          value={password}
        />
        <button className="w-full h-12 mt-4 text-xl btn btn-primary hover:text-white hover:border-transparent">Register</button>
      </form>
      <p className="text-xl font-bold text-center">
        New Here?{" "}
        <Link className="text-blue-700" to="/login">
          Please Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
