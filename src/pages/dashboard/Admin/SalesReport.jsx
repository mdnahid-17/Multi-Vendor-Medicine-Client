import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import SalesReportPrint from "../../../components/dashboard/admin/SalesReportPrint";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";

const SalesReport = () => {
  const printRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDate = (date) => (date ? date.toLocaleDateString("en-CA") : null);

  const { data: sales = [], isLoading } = useQuery({
    queryKey: ["sales-report", startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin/sales-report`, {
        params: { startDate: formatDate(startDate), endDate: formatDate(endDate) },
      });
      return data;
    },
  });
  // handle Print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Sales-Report",
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 mt-10 bg-white shadow md:mt-0 rounded-xl">
      <Helmet>
        <title>Medicine Selling | Sales Report</title>
      </Helmet>
      <h2 className="mb-4 text-2xl font-bold">📊 Sales Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="input input-bordered"
          // dateFormat="yyyy-MM-dd"
          popperClassName="z-50"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="input input-bordered"
          // dateFormat="yyyy-MM-dd"
          popperClassName="z-50"
          minDate={startDate}
        />
        <button onClick={handlePrint} className="btn btn-error">
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Seller</th>
              <th>Buyer</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, i) => (
              <tr key={sale._id}>
                <td>{i + 1}</td>
                <td className="">
                  {sale.cartItems?.length
                    ? sale.cartItems.map((item, i) => (
                        <div key={i}>
                          {item?.name || item?.itemName} (x
                          {item?.quantity || item.qty})
                        </div>
                      ))
                    : sale.name || sale.itemName + " x " + sale.quantity}
                </td>

                <td>{sale.cartItems?.[0]?.seller_Info?.email ?? "seller@gmail.com"}</td>
                <td>{sale.cartItems?.[0]?.user_Info?.email || sale?.user_Info?.email || sale?.email}</td>
                <td>
                  <b>$</b>
                  {sale.totalPrice || sale.price_per_unit}
                </td>
                <td>
                  <span className={`badge badge-success
                    ${sale.status === "approved" ? "bg-blue-300 border-0 text-blue-500 capitalize": " capitalize"}`}>{sale.status}</span>
                </td>
                <td>{new Date(sale.createdAt || sale.paidAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="6" className="my-4 text-2xl font-semibold text-center text-red-500 capitalize">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Hidden Printable Content */}
      <div className="hidden">
        <SalesReportPrint ref={printRef} sales={sales} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default SalesReport;
