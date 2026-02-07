import { forwardRef } from "react";

const SalesReportPrint = forwardRef(({ sales, startDate, endDate }, ref) => {
  console.log(sales);
  return (
    <div ref={ref} className="p-6 text-sm">
      <h1 className="mb-2 text-2xl font-bold text-center">Sales Report</h1>

      <p className="mb-4 text-center">
        Date Range: {startDate ? startDate.toLocaleDateString() : "All"} - {endDate ? endDate.toLocaleDateString() : "All"}
      </p>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Medicine</th>
            <th className="p-2 border">Seller Email</th>
            <th className="p-2 border">Buyer Email</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale._id}>
              <td className="p-2 text-center border">{index + 1}</td>
              <td className="p-2 border">
                {sale.cartItems?.length
                  ? sale.cartItems.map((item, i) => (
                      <div key={i}>
                        {item?.name || item?.itemName} (x
                        {item?.quantity || item.qty})
                      </div>
                    ))
                  : sale.name || sale.itemName + " x " + sale.quantity}
              </td>
              <td className="p-2 border">{sale.cartItems?.[0]?.seller_Info?.email ?? "seller@gmail.com"}</td>
              <td className="p-2 border">{sale.cartItems?.[0]?.user_Info?.email || sale?.user_Info?.email || sale?.email}</td>
              <td className="p-2 border">
                {" "}
                <b>$</b>
                {sale.totalPrice || sale.price_per_unit}
              </td>
              <td
                className={`p-2 border  ${sale.status === "approved" ? " capitalize" : " capitalize"}`}
              >
                {sale.status}
              </td>
              <td className="p-2 border">{new Date(sale.createdAt || sale.paidAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-right">Printed on: {new Date().toLocaleString()}</p>
    </div>
  );
});

export default SalesReportPrint;
