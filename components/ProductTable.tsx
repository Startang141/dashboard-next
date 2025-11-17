"use client";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import productData from "../public/data/data.json";
import Image from "next/image";

const ProductTable = () => {
  const [products, setProduct] = useState<any[]>(productData.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const handleEditClick = (id: any) => {
    setEditingRow(id);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleChange = (id: any, field: any, value: any) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setProduct((prevProduct) =>
      prevProduct.map((product) =>
        product.id === id ? { ...product, [field]: Number(value) } : product
      )
    );
  };

  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are You Sure Want Delete This Product?"
    );
    if (confirmDelete) {
      setProduct((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
      );
    }
  };

  return (
    <div className="bg-neutral-800 backdrop-blur-md shadow-lg rounded-xl border border-neutral-900 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Products List
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
                "Name",
                "Product ID",
                "Category",
                "Price",
                "Stock",
                "Sales",
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
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editingRow === product.id
                    ? "bg-neutral-700 ring-gray-500"
                    : ""
                }`}
              >
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          editingRow === product.id
                            ? handleSaveClick()
                            : handleEditClick(product.id)
                        }
                      >
                        {editingRow === product.id ? (
                          <Save size={16} />
                        ) : (
                          <Edit size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-300">
                    <div>Category : {product.category}</div>
                    {["price", "stock", "sales"].map((field) => (
                      <div key={field}>
                        <span className="capitalize">{field}:</span>
                        {editingRow === product.id ? (
                          <input
                            type="text"
                            className="w-14 bg-transparent text-white border-none outline-none text-center"
                            value={(product as any)[field]}
                            onChange={(e) =>
                              handleChange(product.id, field, e.target.value)
                            }
                          />
                        ) : field === "price" ? (
                          `$${product[field].toFixed(2)}`
                        ) : (
                          (product as any)[field]
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image
                      alt={product.name}
                      src={product.image}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    {product.name}
                  </div>
                </td>

                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {product.id}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>
                {["price", "stock", "sales"].map((field) => (
                  <td
                    key={field}
                    className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  >
                    {editingRow === product.id ? (
                      <input
                        type="text"
                        className="w-14 h-10 bg-neutral-800 text-white border-none outline-none text-center"
                        value={(product as any)[field]}
                        onChange={(e) =>
                          handleChange(product.id, field, e.target.value)
                        }
                      />
                    ) : field === "price" ? (
                      `$${product[field].toFixed(2)}`
                    ) : (
                      (product as any)[field]
                    )}
                  </td>
                ))}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        editingRow === product.id
                          ? handleSaveClick()
                          : handleEditClick(product.id)
                      }
                      className="cursor-pointer"
                    >
                      {editingRow === product.id ? (
                        <Save size={16} />
                      ) : (
                        <Edit size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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

export default ProductTable;
