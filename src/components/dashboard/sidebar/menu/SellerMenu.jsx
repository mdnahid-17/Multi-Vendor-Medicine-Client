import MenuItem from "./MenuItem"
import { MdManageAccounts } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { BiHome } from "react-icons/bi";

const SellerMenu = () => {
  return (
    <>
    <MenuItem address={''} label={'Seller-Home'} icon={BiHome}/>
    <MenuItem address={'seller/manage-medicines'} label={'Manage Medicines'} icon={MdManageAccounts}/>
    <MenuItem address={'seller/payment-history'} label={'Payment History'} icon={FaHistory}/>
    <MenuItem address={'seller/ask-for-advertisement'} label={'Ask For Advertisement'} icon={RiAdvertisementFill}/>

    </>
  )
}

export default SellerMenu
