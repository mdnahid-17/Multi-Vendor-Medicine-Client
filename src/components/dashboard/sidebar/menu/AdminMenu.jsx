import MenuItem from "./MenuItem";
import { FaUsers } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem address="" label={"Admin Home"} icon={FaHome} />
      <MenuItem address="admin/manage-users" label={"Manage Users"} icon={FaUsers} />
      <MenuItem address="admin/manage-category" label={"Manage Category"} icon={BiSolidCategoryAlt} />
      <MenuItem address="admin/payment-management" label={"Payment Management"} icon={MdManageAccounts} />
      <MenuItem address="admin/sales-report" label={"Sales Report"} icon={FcSalesPerformance} />
      <MenuItem address="admin/manage-banner-advertise" label={"Manage banner Advertise"} icon={RiAdvertisementFill} />
    </>
  );
};

export default AdminMenu;
