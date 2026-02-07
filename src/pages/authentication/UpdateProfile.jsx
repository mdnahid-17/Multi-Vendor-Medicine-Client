import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";
import { useState } from "react";

const UpdateProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10 md:mt-0">
      <Helmet>
        <title>Medicine Selling | Update Profile</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-lg md:w-3/5 rounded-2xl">
          <img alt="profile" src="https://wallpapercave.com/wp/wp10784415.jpg" className="w-full mb-4 rounded-t-lg h-36" />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user?.photoURL}
                className="object-cover w-24 h-24 mx-auto border-2 border-white rounded-full "
              />
            </a>

            <p className="p-2 px-4 text-xs text-white uppercase bg-pink-500 rounded-full">{role}</p>
            <p className="px-4 mx-4 mt-2 text-xl font-medium text-gray-800">User Id: {user?.uid}</p>
            <div className="w-full p-4 mx-4 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between space-y-2 text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">{user?.displayName}</span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">{user?.email}</span>
                </p>

                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1"
                  >
                    Update Profile
                  </button>
                  <button className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UpdateProfileModal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default UpdateProfile;
