import React from "react";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import SalesOverviewChart from "@/components/salesOverviewChart";
import CategoryDistributionChart from "@/components/CategoryDistributionChart";
import OrderDistributionChart from "@/components/OrderDistributionChart";
import ProductPerformanceChart from "@/components/ProductPerformanceChart";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="max-w-screen mx-auto p-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard name="Total Sales" icon={DollarSign} value="$128,4" />
          <StatCard name="Total Client" icon={Users} value="111" />
          <StatCard name="Total Product" icon={ShoppingBag} value="1324" />
          <StatCard name="Stock" icon={SquareActivity} value="98" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <OrderDistributionChart />
          <ProductPerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
