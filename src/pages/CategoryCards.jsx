import { useLoaderData, useNavigate } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import CardDetailsModal from "./CardDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { axiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { addToCart } from "../redux/features/Cartslice";
import { Helmet } from "react-helmet";

const CategoryCards = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const products = useLoaderData();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  console.log(products);
  // Open Modal Product
  const openModal = (product) => {
    setSelectedProduct(product); // store selected product
    setIsOpen(true); // open modal
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
      status: "pending",
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

  // const isInCart = products?.some((item) => item.productId === item.id);

  return (
    <>
      <Helmet>
        <title>Medicine Selling | Category Cards</title>
      </Helmet>
      <h2 className="py-4 text-2xl font-bold text-center"> Specific Category Products</h2>
      <div className="overflow-x-auto lg:mx-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg lg:text-xl">No.</th>
              <th className="text-lg lg:text-xl">Category</th>
              <th className="text-lg lg:text-xl">Name</th>
              <th className="text-lg lg:text-xl">Image</th>
              <th className="text-lg lg:text-xl">Price Per Unit</th>
              <th className="text-lg lg:text-xl">Company</th>
              <th className="text-lg text-center lg:text-xl">Cart</th>
              <th className="text-lg lg:text-xl">Details</th>
            </tr>
          </thead>

          {products.map((p, idx) => {
            const { _id, itemName, genericName, price_per_unit, category, company, image } = p;

            const isInCart = cartItems?.some((item) => item.productId === _id);

            return (
              <tbody key={_id}>
                <tr className="transition cursor-pointer hover:bg-blue-100">
                  <th className="my-8 text-base itext-center md:block">{idx + 1}</th>
                  <td className="text-xl font-semibold ">{category}</td>
                  <td className="text-xl font-semibold ">{genericName || itemName}</td>
                  <td className="text-xl font-semibold ">
                    <a href={image} target="-blank">
                      <img src={image} alt={name} className="w-[150px] h-[100px] object-contain" />
                    </a>
                  </td>
                  <td className="text-xl font-semibold text-center">{price_per_unit}</td>
                  <td className="text-xl font-semibold ">{company}</td>
                  <td className="text-xl font-semibold text-center">
                    <button
                      disabled={isInCart}
                      onClick={() => bookingCart(p)}
                      className={`p-2 rounded
              ${isInCart ? "bg-gray-300 text-white cursor-not-allowed" : "bg-gray-400 hover:bg-blue-600 text-black hover:text-white"}
            `}
                    >
                      <FaShoppingCart />
                    </button>

                    {isInCart && <p className="mt-1 text-xs text-red-500">Already in cart</p>}

                    {/* <button onClick={() => bookingCart(p)}>
                      <FaShoppingCart />
                    </button> */}
                  </td>
                  <td className="text-xl font-semibold text-center">
                    <button
                      // to={`/product/${_id}`}
                      onClick={() => openModal(p)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {/* details modals */}
      <CardDetailsModal isOpen={isOpen} closeModal={closeModal} product={selectedProduct} />
    </>
  );
};

export default CategoryCards;
