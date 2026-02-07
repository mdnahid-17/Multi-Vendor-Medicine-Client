import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
import SellerMenu from "./menu/SellerMenu";
import UserMenu from "./menu/UserMenu";
import AdminMenu from "./menu/AdminMenu";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/logo.png";
const SideBar = () => {
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="absolute z-20 w-full p-4 font-bold cursor-pointer sm:hidden md:hidden">
        <div className="flex justify-between">
          <Link to="/">
            <img className="w-[120px] h-[65px] object-cover btn btn-ghost" src={logo} alt="" />
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-active">
            {!isOpen ? <FaBars /> : <RxCross2 size={20} />}
          </button>
        </div>
      </div>
      {/* Sidebar */}

      <div
        className={`md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0  transition duration-200 ease-in-out z-10`}
      >
        <div className="items-center justify-center hidden w-full px-4 py-2 mx-auto rounded-lg shadow-lg md:flex">
          <Link to="/" className="cursor-pointer">
            <img className="w-[120px] h-[65px] object-cover btn btn-ghost" src={logo} alt="" />
          </Link>
        </div>
        {/* Nav Items */}
        <div className="flex flex-col justify-between flex-1 mt-14">
          <nav>
            {role === "Admin" && <AdminMenu />}
            {role === "Seller" && <SellerMenu />}
            {role === "User" && <UserMenu />}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
