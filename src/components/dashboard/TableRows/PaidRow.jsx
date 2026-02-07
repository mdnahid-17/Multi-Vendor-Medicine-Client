const PaidRow = ({ payment, children }) => {
  return (
    <tr className="border-t">
      <td className="p-3">{payment?.email || payment?.user_Info?.email}</td>
      <td className="p-3 text-center">$ {payment.totalPrice || payment?.price_per_unit}</td>
      <td className="p-3 text-center">
        <span
          className={`px-2 py-1 rounded text-xs 
            ${
            payment.status === "paid" ? "bg-green-100 text-green-600 capitalize" : ""
          }
          ${payment.status === "approved" ? "bg-blue-100 text-blue-500 capitalize": " "}
          `}
        >
          {payment.status}
        </span>
      </td>
      <td className="p-3 text-center">{children || "—"}</td>
    </tr>
  );
};

export default PaidRow;
