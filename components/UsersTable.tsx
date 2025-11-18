"use client";
import React, { useMemo, useState } from "react";
import userData from "../public/data/data.json";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import Image from "next/image";

const UsersTable = () => {
  const [users, setUser] = useState(userData.clients);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const filteredClients = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    setUser((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, [field]: Number(value) } : client
      )
    );
  };

  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are You Sure Want Delete This Product?"
    );
    if (confirmDelete) {
      setUser((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
    }
  };
  return (
    <div className="bg-neutral-800 backdrop-blur-md shadow-lg rounded-xl border border-neutral-900 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Client List
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
              {["Name", "Email", "Phone Number", "Country", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editingRow === client.id ? "bg-neutral-700 ring-gray-500" : ""
                }`}
              >
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">
                          {client.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {client.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          editingRow === client.id
                            ? handleSaveClick()
                            : handleEditClick(client.id)
                        }
                      >
                        {editingRow === client.id ? (
                          <Save size={16} />
                        ) : (
                          <Edit size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-300">
                    <div>Phone Number : {client.phoneNumber}</div>
                  </div>
                  <div className="text-xs text-gray-300">
                    <div>Country : {client.country}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image
                      alt={client.name}
                      src={client.image}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    {client.name}
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {client.email}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {client.phoneNumber}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {client.country}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        editingRow === client.id
                          ? handleSaveClick()
                          : handleEditClick(client.id)
                      }
                      className="cursor-pointer"
                    >
                      {editingRow === client.id ? (
                        <Save size={16} />
                      ) : (
                        <Edit size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
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

export default UsersTable;
