import { Outlet } from "react-router";
import SideBar from "../components/dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <SideBar />
      <div className='flex-1 md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
