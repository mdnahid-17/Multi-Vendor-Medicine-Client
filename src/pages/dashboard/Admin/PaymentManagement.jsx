import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import Section from "../../../components/Section";
import PendingRow from "../../../components/dashboard/TableRows/PendingRow";
import PaidRow from "../../../components/dashboard/TableRows/PaidRow";
import { Helmet } from "react-helmet";

const PaymentManagement = () => {
  const queryClient = useQueryClient();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      console.log(res.data);
      return res.data;
    },
  });

 const acceptMutation = useMutation({
  mutationFn: async (id) => {
    return axiosSecure.patch(`/accept-payment/${id}`);
  },
  onSuccess: () => {
    Swal.fire("Success!", "Payment Accepted Successfully", "success");
    queryClient.invalidateQueries(["admin-payments"]);
  },
  onError: () => {
    Swal.fire("Error!", "Something went wrong", "error");
  },
});



  const handleAcceptPayment = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to accept this payment?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Accept it!",
  }).then((result) => {
    if (result.isConfirmed) {
      acceptMutation.mutate(id);
    }
  });
};


  if (isLoading) return <LoadingSpinner />;
  const { pending = [], paid = [] } = data;

  return (
    <div className="p-6 mt-10 md:mt-0">
      <Helmet>
        <title>Medicine Selling | Payment Management</title>
      </Helmet>
      <h2 className="mb-6 text-2xl font-bold">💳 Payment Management</h2>

      {/* Paid Payments */}
      <Section title="Paid Payments" color="green">
        {paid.map((p) => (
          <PaidRow key={p._id} payment={p} />
        ))}
      </Section>

      {/* Pending Payments */}
      <Section title="Pending Payments" color="red">
        {pending.map((p) => (
          <PendingRow key={p._id} payment={p}>
            <button
              onClick={() => handleAcceptPayment(p._id)}
              className="px-3 py-4 text-white bg-green-500 rounded btn hover:bg-green-600"
            >
            {acceptMutation.isPending ? "Processing..." : "Accept Payment"}
            </button>
          </PendingRow>
        ))}
      </Section>
    </div>
  );
};

export default PaymentManagement;
