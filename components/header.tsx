import React from "react";
import { Bell } from "lucide-react";
import user from "../public/jkw.jpg";
import Image from "next/image";

function header() {
  return (
    <header className="bg-neutral-800 shadow-lg border-b border-neutral-900 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-100">
          Dashboard
        </div>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button className="cursor-pointer">
            <Bell></Bell>
          </button>
          <Image
            src={user}
            alt="user"
            className="rounded-full w-8 h-8 object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export default header;
