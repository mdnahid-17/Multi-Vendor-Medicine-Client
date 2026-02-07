import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { data: paymentsHistory, isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/payments/history/${user.email}`);
      setPayments(data);
      return data;
    },
  });
  // console.log(paymentsHistory);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl p-6 mx-auto mt-10 md:mt-0">
      <Helmet>
        <title>Medicine Selling | Payment History</title>
      </Helmet>
      <div>
        <h1 className="text-xl font-semibold">Payment History</h1>
        <p className="pb-2 text-gray-400">Overview of sales revenue and order status.</p>
      </div>

      <div className="overflow-x-auto ">
        <table className="table w-full border border-gray-400">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-blue-100">
                <td>{index + 1}</td>
                <td className="font-mono text-sm">{payment.transactionId}</td>
                <td>${payment.totalPrice}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      payment.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>

                {/* <td>{new Date(payment.date).toLocaleDateString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && <p className="mt-5 text-2xl font-semibold text-center ">No payment history found</p>}
      </div>
    </div>
  );
};

export default PaymentHistory;
