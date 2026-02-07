import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaUsersCog } from "react-icons/fa";
import UpdateUserModal from "../../modal/UpdateUserModal";
const UserDataRow = ({ user,idk, refetch }) => {
  const { user: loggedInUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role);
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      Swal.fire({
        title: "Success",
        text: "User role updated successfully!",
        icon: "success",
        confirmButtonText: "ok!",
      });
      setIsOpen(false);
    },
  });

  //   modal handler
  const modalHandler = async (selected) => {
    if (loggedInUser.email === user.email) {
      Swal.fire({
        title: "Error",
        text: "Action Not Allowed",
        icon: "error",
        confirmButtonText: "ok!",
      });
      return setIsOpen(false);
    }

    const userRole = {
      role: selected,
      status: "Verified",
    };

    try {
      await mutateAsync(userRole);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "ok!",
      });
    }
  };
  return (
    <tr className="hover:bg-blue-100">
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{idk+1}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        {user?.status ? (
          <p className={`${user.status === "Verified" ? "text-green-500" : "text-yellow-500"} whitespace-no-wrap`}>
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
        <button
          onClick={() => setIsOpen(true)}
          className="relative px-3 py-1 font-semibold leading-tight text-green-900 cursor-pointer"
        >
          <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
          <span className="relative">Update Role </span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user} />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
