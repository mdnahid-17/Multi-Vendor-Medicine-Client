import { Navigate, Outlet } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../shared/LoadingSpinner'
const AdminRoute = () => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Admin') return  <Outlet />; 
  return <Navigate to='/dashboard' />
}

export default AdminRoute

