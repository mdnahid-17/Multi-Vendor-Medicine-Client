import MenuItem from "./MenuItem"
import { FaHistory } from "react-icons/fa";

 const UserMenu = () => {
  return (
    <>
    <MenuItem address={'user/payment-history'} label={'Payment history'} icon={FaHistory}/>
    
    
    </>
  )
}
export default UserMenu