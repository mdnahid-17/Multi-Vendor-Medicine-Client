import { Link, NavLink } from "react-router";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import SellerRequestModal from "./modal/SellerRequestModal";
import Swal from "sweetalert2";
import { useState } from "react";
import { axiosSecure } from "../hooks/useAxiosSecure";
import logo from "../assets/logo.png";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();

  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    console.log("I want to be a seller");
    try {
      const currentUser = {
        email: user?.email,
        role: "User",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Please wait for admin confirmation 👍",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Requested",
          text: "Please wait for admin approval 🙏",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message || "Please try again later",
      });
    } finally {
      closeModal();
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-base text-sky-400  font-semibold" : "text-base font-semibold  hover:text-green-400"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="shop"
          className={({ isActive }) =>
            isActive ? "text-base text-sky-400  font-semibold" : "text-base font-semibold  hover:text-green-400"
          }
        >
          Shop{" "}
        </NavLink>
      </li>
      <li>
        <details>
          <summary className="text-base font-semibold hover:text-green-400">Languages</summary>
          <ul className="p-2">
            <li className="text-base font-semibold hover:text-green-400">
              <a>English</a>
            </li>
            <li className="text-base font-semibold hover:text-green-400">
              <a>Bangla</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <NavLink
          to="cart-page"
          className={({ isActive }) =>
            isActive ? "text-base text-sky-400 font-semibold my-1" : " text-base font-semibold my-1  hover:text-green-400"
          }
        >
          <FaShoppingCart />
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="z-10 shadow-sm navbar bg-base-100 lg:px-10">
      {/* logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {" "}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
            </svg>
          </div>
          <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl tracking-tighter ">
          <img className="w-[120px] h-[65px] object-cover btn btn-ghost" src={logo} alt="" />
        </Link>
      </div>
      {/* menu */}
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">{navLinks}</ul>
      </div>
      {/* login button */}
      <div className="navbar-end">
        {/* Seller Host Button */}
        {user && role === "User" && (
          <div className="mt-2">
            <button onClick={() => setIsModalOpen(true)} className="mr-3 font-semibold btn btn-outline btn-accent">
              Become a Seller
            </button>
          </div>
        )}
        {/* Modal Request With Seller */}
        <SellerRequestModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler} />

        {/* Drop Down Menu */}
        {user ? (
          <div className="w-1/3">
            <details className="dropdown dropdown-end">
              {/* <summary className="m-1 bg-transparent rounded-full btn">
                <img className="w-full h-full rounded-full" src={user && user.photoURL ? user.photoURL : <FaUser />} alt="" />
              </summary> */}
              <summary className="m-1 btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user?.photoURL ? <img src={user.photoURL} alt="User" /> : <FaUser className="text-xl" />}
                </div>
              </summary>
              <ul className="p-2 shadow-sm w-52 menu dropdown-content bg-base-100 rounded-box z-1">
                <li>
                  <Link to="/dashboard" className="block px-4 py-3 font-semibold transition hover:bg-neutral-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="block px-4 py-3 font-semibold transition hover:bg-neutral-100">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="flex justify-center w-full font-semibold text-center text-black border-4 border-black"
                  >
                    SignOut
                  </button>
                </li>
              </ul>
            </details>
          </div>
        ) : (
          <Link to="/register">
            <button className="text-lg font-bold text-white btn btn-accent hover:text-black duration-600">Join US</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
