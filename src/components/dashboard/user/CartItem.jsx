import { useDispatch } from "react-redux";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { decreaseQty, increaseQty, removeItem } from "../../../redux/features/Cartslice";
import Swal from "sweetalert2";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    dispatch(increaseQty(item._id));
    const { data } = await axiosSecure.patch(`/cart-update/${item._id}`, {
      quantity: item.quantity + 1,
    });
    console.log(data);
  };
  const handleDecrease = async () => {
    dispatch(decreaseQty(item._id));
    await axiosSecure.patch(`/cart-update/${item._id}`, {
      quantity: item.quantity > 1 && item.quantity - 1,
    });
  };

  const handleDelete = async () => {
    // Confirmation
    const result = await Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 1️⃣ Optimistic UI update
      dispatch(removeItem(item._id));

      // 2️⃣ Backend sync
      const { data } = await axiosSecure.delete(`/cart/${item._id}`);
      console.log(data);
      // setCartList(data)
      Swal.fire("Removed!", "Item has been removed from cart.", "success");
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire("Error!", "Could not remove item. Try again.", "error");
    }
  };

  return (
    <tbody>
      <tr className="transition border-b border-gray-300 cursor-pointer hover:bg-blue-100 ">
        {/* <th className="my-8 text-base itext-center md:block">{idx + 1}</th> */}
        <td className="text-xl font-semibold ">
          <div className="flex justify-around">
            <div className="gap-4">
              <h5 className="font-bold text-gray-500">
                Name <span className="text-black">{item.itemName||item.name}</span>
              </h5>
              <h5 className="font-bold text-gray-500">
                Company <span className="text-black">{item.company}</span>
              </h5>
            </div>
            <a href={item.image} target="-blank">
              <img src={item.image} alt={item.name} className="w-[150px] h-[100px] object-contain" />
            </a>
          </div>
        </td>
        <td className="text-xl font-semibold text-center">{item.price_per_unit}</td>

        <td className="text-xl font-semibold text-center">
          <div className="flex items-center justify-center gap-2">
            <button className="btn btn-outline" onClick={handleDecrease}>
              -
            </button>
            <span>{item.quantity ? item.quantity : 1}</span>
            <button className="btn btn-outline" onClick={handleIncrease}>
              +
            </button>
          </div>
        </td>
        <td className="text-xl font-semibold text-center">
          <button className="text-red-500 btn hover:border-red-600" onClick={handleDelete}>
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
