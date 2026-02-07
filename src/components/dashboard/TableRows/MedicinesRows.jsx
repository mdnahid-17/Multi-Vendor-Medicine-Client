import { useDispatch, useSelector } from "react-redux";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { addToCart } from "../../../redux/features/Cartslice";
import { FaEye, FaShoppingCart } from "react-icons/fa";

const MedicinesRows = ({ product, idx, openModal }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems?.some((item) => item.productId === product._id);
  const navigate = useNavigate();

  // Open Modal Cart / booking
  const bookingCart = async (p) => {
    if (!user) {
      Swal.fire({
        title: "Error",
        text: "Please login first",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    console.log("booking success fully!", p);

    const bookingInfo = {
      ...p,
      quantity: 1,
      productId: p._id,
      user_Info: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    delete bookingInfo._id;

    dispatch(addToCart(bookingInfo));

    try {
      const { data } = await axiosSecure.post("/cart", bookingInfo);
      console.log(data);
      navigate("/cart-page");
      Swal.fire({
        title: "Success",
        text: "Cart Save Successfully Done!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <tr className="transition cursor-pointer hover:bg-blue-100">
      <th className="my-8 text-base itext-center md:block">{idx + 1}</th>
      <td className="text-xl font-semibold ">{product.category}</td>
      <td className="text-xl font-semibold ">{product.itemName || product.name}</td>
      <td className="text-xl font-semibold ">
        <a href={product.image} target="-blank">
          <img src={product.image} alt={product.name} className="w-[150px] h-[100px] object-contain" />
        </a>
      </td>
      <td className="text-xl font-semibold text-center">{product.price_per_unit}</td>
      <td className="text-xl font-semibold ">{product.company}</td>
      <td className="text-xl font-semibold text-center">
        <button
          disabled={isInCart}
          onClick={() => bookingCart(product)}
          className={`p-2 rounded
                      ${isInCart ? "bg-gray-300 text-white cursor-not-allowed" : "bg-gray-400 hover:bg-blue-600 text-black hover:text-white"}
                    `}
        >
          <FaShoppingCart />
        </button>

        {isInCart && <p className="mt-1 text-xs text-red-500">Already in cart</p>}
      </td>
      <td className="text-xl font-semibold text-center">
        <button
          // to={`/product/${_id}`}
          onClick={() => openModal(product)}
        >
          <FaEye />
        </button>
      </td>
    </tr>
  );
};

export default MedicinesRows;
