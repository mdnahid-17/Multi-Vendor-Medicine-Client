import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";

// Public Pages
import Home from "../pages/authentication/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Shop from "../pages/Shop";
import CategoryCards from "../pages/CategoryCards";

// Auth Guard
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

// Admin Pages
import AdminHome from "../pages/dashboard/Admin/AdminHome";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import ManageCategory from "../pages/dashboard/Admin/ManageCategory";
import SalesReport from "../pages/dashboard/Admin/SalesReport";
import BannerAdvertiseTabs from "../pages/dashboard/Admin/BannerAdvertiseTabs";
import BannerAdvertiseSlider from "../components/dashboard/admin/BannerAdvertiseSlider";
import AddToSlide from "../components/dashboard/admin/AddToSlide";

// Seller Pages
import SellerHome from "../pages/dashboard/Seller/SellerHome";
import ManageMedicines from "../pages/dashboard/Seller/ManageMedicines";
import Advertisement from "../pages/dashboard/Seller/Advertisement";

// User Pages
import CartPage from "../pages/dashboard/User/CartPage";
import CheckoutPage from "../pages/dashboard/User/payment/CheckoutPage";
import InvoicePage from "../pages/dashboard/User/payment/InvoicePage";
import PaymentHistory from "../pages/dashboard/User/payment/PaymentHistory";
import DashboardRedirect from "./DashboardRedirect";
import UpdateProfile from "../pages/authentication/UpdateProfile";
import PaymentManagement from "../pages/dashboard/Admin/PaymentManagement";

const router = createBrowserRouter([
  /* ================= PUBLIC ROUTES ================= */
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      {
        path: "subCategory/:category",
        element: <CategoryCards />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/products-category/${params.category}`),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      /* -------- USER ROUTES -------- */
      {
        path: "cart-page",
        element: <CartPage />,
      },
      {
        path: "checkout-page",
        element: <CheckoutPage />,
      },
      {
        path: "invoice-page/:id",
        element: <InvoicePage />,
      },
    ],
  },

  /* ================= DASHBOARD (PRIVATE) ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      /* -------- ADMIN ROUTES -------- */
      {
        path: "profile",
        element: <UpdateProfile />,
      },
      {
        index: true,
        element: <DashboardRedirect />,
      },
      /* -------- USER ROUTES -------- */
      {
        path: "user",
        children: [{ path: "payment-history", element: <PaymentHistory /> }],
      },
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-category", element: <ManageCategory /> },
          { path: "sales-report", element: <SalesReport /> },
          {path:'payment-management',element:<PaymentManagement />},

          {
            path: "manage-banner-advertise",
            element: <BannerAdvertiseTabs />,
            children: [
              { index: true, element: <BannerAdvertiseSlider /> },
              { path: "add-to-slide", element: <AddToSlide /> },
            ],
          },
        ],
      },

      /* -------- SELLER ROUTES -------- */
      {
        path: "seller",
        element: <SellerRoute />,
        children: [
          { index: true, element: <SellerHome /> },
          { path: "manage-medicines", element: <ManageMedicines /> },
          { path: "payment-history", element: <PaymentHistory /> },
          { path: "ask-for-advertisement", element: <Advertisement /> },
        ],
      },
    ],
  },
]);

export default router;
