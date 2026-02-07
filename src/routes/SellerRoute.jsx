import { Navigate, Outlet } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../shared/LoadingSpinner'
const SellerRoute = () => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Seller') return <Outlet />
  return <Navigate to='/dashboard' />
}

export default SellerRoute

