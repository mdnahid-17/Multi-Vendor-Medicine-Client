import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import UserDataRow from "../../../components/dashboard/TableRows/UserDataRow";
import { Helmet } from "react-helmet";
const ManageUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);

      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 lg:mt-0">
         <Helmet>
        <title>Medicine Selling | Manage Users</title>
      </Helmet>
      <h1 className="text-xl font-semibold">Users Management</h1>
      <p className="mb-2 text-gray-400">Overview of Users Management status.</p>
      <div className="overflow-x-auto lg:mx-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg lg:text-xl">No.</th>
              <th className="text-lg lg:text-xl">E-mail</th>
              <th className="text-lg lg:text-xl">Role</th>
              <th className="text-lg lg:text-xl">Status</th>
              <th className="text-lg lg:text-xl">Action</th>
            </tr>
          </thead>

          <tbody>
             {users.map((user,idk) => (
              <UserDataRow key={user?._id} idk={idk} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
