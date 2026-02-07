const PendingRow = ({ payment, children }) => {
  return (
    <tr className="border-t">
      <td className="p-3">{payment?.user_Info?.email}</td>
      <td className="p-3 text-center">$ {payment?.price_per_unit}</td>
      <td className="p-3 text-center">
        <span
          className={`px-2 py-1 rounded text-xs ${
            payment.status === "pending" ? "bg-red-100 text-red-600 capitalize" : "bg-green-100 text-green-600 capitalize"
          }`}
        >
          {payment.status}
        </span>
      </td>
      <td className="p-3 text-center">{children || "—"}</td>
    </tr>
  );
};

export default PendingRow;
