
const Section = ({title,children,color}) => {
  return (
    <div className="mb-10">
    <h3 className={`text-xl font-semibold mb-4 text-${color}-600`}>
      {title}
    </h3>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Buyer</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  </div>
  )
}

export default Section