import ProductTable from "@/components/ProductTable";
import StatCard from "@/components/StatCard";
import {
  ChartBarStacked,
  DollarSign,
  ShoppingBag,
  SquareActivity,
} from "lucide-react";
import React from "react";

const productPage = () => {
  return (
    <div className="flex-1 overflow-auto z-10 relative">
      <main className="max-w-screen mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard name="Total Products" icon={ShoppingBag} value={"4,325"} />
          <StatCard name="Total Stock" icon={SquareActivity} value={"18,525"} />
          <StatCard name="Total Sold" icon={DollarSign} value={"12,228"} />
          <StatCard name="Total Category" icon={ChartBarStacked} value={8} />
        </div>
        <div>
          <ProductTable />
        </div>
      </main>
    </div>
  );
};

export default productPage;
