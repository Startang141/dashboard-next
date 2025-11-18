import React, { useMemo, useState } from "react";
import OrdersData from "../public/data/data.json";
import { Edit, Save, Search, Trash2 } from "lucide-react";

const OrderTable = () => {
  const [orders, setOrders] = useState(OrdersData.orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const fileteredOrder = useMemo(() => {
    return orders.filter((order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleEditClick = (id: any) => {
    setEditingRow(id);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleChange = (id: any, field: any, value: any) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setOrders((prevOrders) =>
      prevOrders.map((client) =>
        client.id === id ? { ...client, [field]: Number(value) } : client
      )
    );
  };

  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are You Sure Want Delete This Product?"
    );
    if (confirmDelete) {
      setOrders((prevOrders) =>
        prevOrders.filter((client) => client.id !== id)
      );
    }
  };

  return (
    <div className="bg-neutral-800 backdrop-blur-md shadow-lg rounded-xl border border-neutral-900 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Order List
        </h2>
        <div className="relative md:max-w-3xl w-auto">
          <input
            type="text"
            placeholder="Search Products"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="bg-neutral-700 backdrop-blur-lg w-full py-2 pl-10 pr-4 rounded-lg focus:outline-0 focus:ring-1 focus:ring-neutral-500 transition duration-200 text-sm"
          />
          <Search
            className="text-neutral-400 absolute top-2 left-3"
            size={18}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {[
                "ID",
                "Client",
                "Email",
                "Total",
                "Status",
                "Date",
                "Country",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {fileteredOrder.map((order) => (
              <tr
                key={order.id}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editingRow === order.id ? "bg-neutral-700 ring-gray-500" : ""
                }`}
              >
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-100">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-100">
                          {order.client}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.email}
                        </div>
                        <div
                          className={`${
                            order.status === "Delivered"
                              ? "bg-green-400 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-400 text-yellow-800"
                              : "bg-red-300 text-red-800"
                          }text-xs rounded w-fit px-1.5 py-0.5 my-2`}
                        >
                          {order.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          editingRow === order.id
                            ? handleSaveClick()
                            : handleEditClick(order.id)
                        }
                      >
                        {editingRow === order.id ? (
                          <Save size={16} />
                        ) : (
                          <Edit size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-300">
                    <div>Phone Number : {order.status}</div>
                  </div>
                  <div className="text-xs text-gray-300">
                    <div>Country : {order.total}</div>
                  </div>
                  <div className="text-xs text-gray-300">
                    <div>Date : {order.date}</div>
                  </div>
                  <div className="text-xs text-gray-300">
                    <div>Country : {order.country}</div>
                  </div>
                </td>
                {/* Desktop View */}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">{order.id}</div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.client}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.email}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${order.total}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-300">
                  <span
                    className={`py-0.5 px-1.5 rounded ${
                      order.status === "Delivered"
                        ? "bg-green-400 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-400 text-yellow-800"
                        : "bg-red-300 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.date}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.country}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        editingRow === order.id
                          ? handleSaveClick()
                          : handleEditClick(order.id)
                      }
                      className="cursor-pointer"
                    >
                      {editingRow === order.id ? (
                        <Save size={16} />
                      ) : (
                        <Edit size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
