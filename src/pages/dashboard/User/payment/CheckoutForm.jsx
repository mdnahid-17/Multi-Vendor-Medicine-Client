import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router";
import "../payment/CheckoutForm.css";
import useAuth from "../../../../hooks/useAuth";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { clearCart } from "../../../../redux/features/Cartslice";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const InTotalPrice = state?.totalPrice;
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!cartItems.length) navigate("/cart-page");
  }, [cartItems, navigate]);

  useEffect(() => {
    if (InTotalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { amount: InTotalPrice }).then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [InTotalPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      // 1. Create payment info object
      const paymentInfo = {
        //  userId: cartItems._id,
        email: user.email,
        cartItems,
        totalPrice: InTotalPrice,
        transactionId: paymentIntent.id,
        createdAt: new Date(),
        status: "paid",
      };
      delete paymentInfo._id;
      // console.log(paymentInfo);
      try {
        // 2. save payment info in booking collection (db)
        const { data } = await axiosSecure.post("/booking", paymentInfo);
        console.log(data);
        dispatch(clearCart());
        const { data:deleteData } = await axiosSecure.delete(`/carts/${user.email}`);
        console.log(deleteData);
        navigate(`/invoice-page/${data.insertedId}`);
        Swal.fire({
          title: "Success",
          text: "Bookings & Payment Successfully!",
          icon: "success",
          confirmButtonText: "ok!",
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "ok!",
        });
      }
    }

    setProcessing(false);
  };

  return (
    <div className="w-1/2 p-4 mx-auto mt-6 border border-gray-300 rounded-xl">
      Checkout Form
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex justify-around mt-2">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md cursor-pointer hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? <ImSpinner9 className="m-auto animate-spin" size={24} /> : `Pay $${InTotalPrice}`}
          </button>
        </div>
      </form>
      {cardError && <p className="ml-8 text-red-600">{cardError}</p>}
    </div>
  );
};

export default CheckoutForm;
