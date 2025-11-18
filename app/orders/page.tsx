"use client";
import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import { Ban, CheckCircle, Clock, ShoppingBag } from "lucide-react";
import OrderTable from "@/components/OrderTable";

const Orderspage = () => {
  return (
    <div className="flex-1 overflow-auto z-10 relative">
      <main className="max-w-screen mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard name="Total Orders" icon={ShoppingBag} value="15,240" />
          <StatCard name="Completed Orders" icon={CheckCircle} value="13,500" />
          <StatCard name="Pending Orders" icon={Clock} value="1,120" />
          <StatCard name="Canceled Orders" icon={Ban} value="620" />
        </div>
        <div>
          <OrderTable />
        </div>
      </main>
    </div>
  );
};

export default Orderspage;
