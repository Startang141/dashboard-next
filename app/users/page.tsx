import StatCard from "@/components/StatCard";
import UsersTable from "@/components/UsersTable";
import { RotateCcw, UserCheck, UserIcon, UserPlus } from "lucide-react";
import React from "react";

const usersPage = () => {
  return (
    <div className="flex-1 overflow-auto z-10 relative">
      <main className="max-w-screen mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard name="Total Clients" icon={UserIcon} value="7870" />
          <StatCard name="New Clients" icon={UserPlus} value="860" />
          <StatCard name="Active Clients" icon={UserCheck} value="4080" />
          <StatCard name="Returning Clients" icon={RotateCcw} value="2730" />
        </div>
        <div>
          <UsersTable />
        </div>
      </main>
    </div>
  );
};

export default usersPage;
