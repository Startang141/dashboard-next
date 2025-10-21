import { LucideIcon, User } from "lucide-react";
import React from "react";

interface statCardProp {
  name: string;
  icon: LucideIcon;
  value: string | number;
}

const StatCard = ({ name, icon: Icon, value }: statCardProp) => {
  return (
    <div className="bg-neutral-800 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-neutral-900 ">
      <div className="px-4 py-5 sm: p-6">
        <span className="flex items-center text-sm font-medium text-gray-300 gap-2">
          <Icon size={20} />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
