import { Helmet } from "react-helmet";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { axiosCommon } from "../../hooks/useCommon";
import { MdErrorOutline } from "react-icons/md";
const Login = () => {
  const { signIn, loading, signInWithGoogle, githubLogin, saveUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // login user
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);
      console.log(result.user);
      const { data } = await axiosCommon.post(
        `/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      navigate(location?.state || '/', { replace: true });
      Swal.fire({
        title: "Success",
        text: "SignIn successfully done",
        icon: "success",
        confirmButtonText: "ok!",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something is Wrong",
        icon: "error",
        confirmButtonText: "ok!",
      });
    }
  };

  // google sign
  const handleGoogleSignIn = async () => {
    try {
      // 1. google sign in from firebase
      const result = await signInWithGoogle();
      console.log(result.user);
      // user role set
      await saveUser({
        email: result?.user?.email,
        role: "User", // default for Google sign-in
      });
      //2. get token from server using email
      const { data } = await axiosCommon.post(
        `/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      Swal.fire({
        title: "Success",
        text: "SignIn successfully done",
        icon: "success",
        confirmButtonText: "ok!",
      });
      navigate(location?.state, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Something is Wrong",
        icon: "error",
        confirmButtonText: "ok!",
      });
    }
  };

  // github sign
  const handleGithubSignIn = async () => {
    try {
      // 1. google sign in from firebase
      const result = await githubLogin();
      console.log(result.user);
      // user role set
      await saveUser({
        email: result?.user?.email,
        role: "User", // default for Google sign-in
      });
      //2. get token from server using email
      const { data } = await axiosCommon.post(
        `/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      Swal.fire({
        title: "Success",
        text: "SignIn successfully done",
        icon: "success",
        confirmButtonText: "ok!",
      });
      navigate(location?.state, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Something is Wrong",
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
        <title>Medicine Selling | Login</title>
      </Helmet>

      <h1 className="pb-4 text-3xl font-bold text-center text-black">This is LogIn Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="container py-5 mx-auto">
        <label className="my-3 text-xl font-semibold">Email</label>
        <div className="relative">
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.email,
            })}
            type="email"
            name="email"
            placeholder="Enter Your email"
            {...register("email", { required: true })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.email })}></MdErrorOutline>
        </div>
        {errors.email && <span className="mb-3 text-xl font-semibold text-red-600">This field is required</span>}
        <br />
        <div className="relative">
          <label className="py-3 text-xl font-semibold">Password</label>
          <input
            className={classNames("w-full border border-gray-400 rounded-md p-4 text-xl mb-3 outline-none", {
              "is-invalid": errors.password,
            })}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <MdErrorOutline className={classNames("error", { "error-icon": errors.password })}></MdErrorOutline>
          {errors.password && <span className="mb-3 text-xl font-semibold text-red-600">This field is required</span>}
          <span onClick={() => setShowPassword(!showPassword)} className="absolute text-2xl right-3 top-12">
            {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </span>
          <br />
        </div>
        <div className="flex items-center py-4 pb-5">
          <p className="text-xl font-semibold hover:underline">Forget Password</p>
        </div>
        <button className="w-full h-12 text-xl btn btn-primary hover:text-white hover:border-transparent">LogIn</button>
      </form>
      <p className="mx-auto text-xl font-bold">
        New Here?{" "}
        <Link className="text-blue-700" to="/register">
          Please Register Now
        </Link>
      </p>
      <h3 className="pt-8 text-2xl font-bold text-center divider">continue with </h3>
      <div className="flex justify-around py-5">
        <button onClick={handleGoogleSignIn} className="flex mx-3 text-lg btn btn-outline">
          <FaGoogle></FaGoogle>Google
        </button>
        <button onClick={handleGithubSignIn} className="flex mr-3 text-lg btn btn-outline btn-neutral">
          <FaGithub size={24}></FaGithub>Github
        </button>
      </div>
    </div>
  );
};

export default Login;
