import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import { useReactToPrint } from "react-to-print";
import LoadingSpinner from "../../../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import logo from "../../../../assets/logo.png";
const InvoicePage = () => {
  const { id } = useParams();
  const componentRef = useRef(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axiosSecure(`/invoice-page/${id}`).then((res) => setInvoice(res.data));
  }, [id]);
  // handle print
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Invoice",
  });
  // console.log(componentRef.current);

  if (!invoice) return <LoadingSpinner />;
  return (
    <div className="max-w-4xl mx-auto my-10 overflow-x-auto">
      <Helmet>
        <title>Medicine Selling | Invoice Page</title>
      </Helmet>
      <div ref={componentRef} className="p-8 bg-white border border-gray-300 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <img className="w-[120px] h-[65px] object-cover btn btn-ghost" src={logo} />
          </Link>
          <div className="text-right">
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-sm">#{invoice?._id}</p>
            <p className="text-sm">{new Date(invoice?.createdAt).toDateString()}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold">Billed To</h4>
            <p>{invoice?.name}</p>
            <p>{invoice?.email}</p>
          </div>
          <div>
            <h4 className="font-semibold">Payment Info</h4>
            <p className="text-sm md:text-lg">Transaction ID: {invoice?.transactionId}</p>
            <p>Status: Paid</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.cartItems.map((item, i) => (
              <tr key={i}>
                <td className="p-2 border">{item?.itemName || item?.name}</td>
                <td className="p-2 border">${item?.price_per_unit}</td>
                <td className="p-2 border">{item?.quantity}</td>
                <td className="p-2 border">${(item?.price_per_unit * item?.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 text-right">
          <h3 className="text-xl font-bold">Total: ${invoice?.totalPrice.toFixed(2)}</h3>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-center text-gray-500">Thank you for your purchase!</p>
      </div>

      {/* Print Button */}
      <button onClick={handlePrint} className="mt-6 btn btn-primary">
        Print / Download PDF
      </button>
    </div>
  );
};

export default InvoicePage;
