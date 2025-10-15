"use client";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
};

const sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  });

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div
      className={`relative z-10 transition-all ease-in-out duration-300 flex-shrink-0  ${
        isSidebarOpen ? `w-64` : `w-[86px]`
      }`}
    >
      <div className="h-full bg-neutral-800 backdrop-blur-md p-4 flex flex-col border-r border-neutral-900">
        <button>
          <Menu onClick={() => handleSidebar()} className="cursor-pointer" />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors mb-2 ${
                    pathname === item.href ? `bg-neutral-700` : ``
                  }`}
                >
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  <span
                    className={`ml-4 whitespace-nowrap transition-all ease-in-out ${
                      isSidebarOpen ? `block` : `hidden`
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default sidebar;
