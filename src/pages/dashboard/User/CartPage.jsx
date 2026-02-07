import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import CartItem from "../../../components/dashboard/user/CartItem";
import CartSummer from "../../../components/dashboard/user/CartSummer";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, setCart } from "../../../redux/features/Cartslice";
import { useEffect } from "react";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const { user, loading } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  // const selectCartItems = (state) => state.cart.items;
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (sum, item) => Number(sum) + Number(item.price_per_unit) * Number(item.quantity) - item.discount,
    0,
  );

  useEffect(() => {
    axiosSecure(`/carts/${user?.email}`).then((res) => dispatch(setCart(res.data)));
  }, [dispatch, user?.email]);
  console.log(cartItems);

  // All Clear Cart Delete
  const handleClear = async () => {
    const result = await Swal.fire({
      title: "Remove All Item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 1️⃣ Optimistic UI update
      dispatch(clearCart());

      // 2️⃣ Backend sync
      const { data } = await axiosSecure.delete(`/carts/${user.email}`);
      console.log(data);
      Swal.fire("Removed!", "Item has been removed from cart.", "success");
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire("Error!", "Could not remove item. Try again.", "error");
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>Medicine Selling | Cart Page</title>
      </Helmet>
      <div className="my-3 text-center">
        <button onClick={handleClear} className="font-bold md:text-xl btn btn-primary">
          Clear All Cart
        </button>
      </div>
      <div className="justify-between gap-4 mx-4 md:flex">
        <div className="overflow-x-auto">
          <table className="table border border-gray-300">
            {/* head */}
            <thead>
              <tr>
                {/* <th className="text-lg lg:text-xl">No.</th> */}
                <th className="text-lg text-center lg:text-xl">Products</th>
                <th className="text-lg text-center lg:text-xl">Price</th>
                <th className="text-lg text-center lg:text-xl">Quantity</th>
              </tr>
            </thead>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </table>
        </div>
        <div className="flex-col md:w-1/3 md:flex-1">
          <CartSummer selectTotalPrice={totalPrice} cartItems={cartItems} />
        </div>
      </div>

      {!cartItems.length && <p className="text-2xl font-semibold text-center">Cart is empty</p>}
    </div>
  );
};

export default CartPage;
