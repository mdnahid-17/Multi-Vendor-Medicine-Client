import { Navigate } from "react-router";
import LoadingSpinner from "../shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const DashboardRedirect = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;

  if (role === "Admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "Seller") return <Navigate to="/dashboard/seller" replace />;

  return <Navigate to="/dashboard/user/payment-history" replace />;
};

export default DashboardRedirect;
