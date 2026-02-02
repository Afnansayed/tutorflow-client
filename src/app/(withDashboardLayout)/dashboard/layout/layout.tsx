"use client";
import DashboardHeader from "@/components/DashboardCommonFile/DahsboardHeader";
import { dashboardRoutes } from "@/components/DashboardCommonFile/DashboardRoutes";
import DashboardSidebar from "@/components/DashboardCommonFile/DashboardSidebar";
import { RootState } from "@/components/Redux/store";
import React from "react";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <div className="flex bg-white w-full min-h-screen gap-1 p-1">
      <div
        className={`bg-gray-100 space-y-2 rounded-md shadow-md transition-all duration-300${
          isSidebarOpen ? " w-60 px-4 py-3 " : "w-14 px-1 py-2"
        }`}
      >
        {dashboardRoutes.map((route, index) => (
          <DashboardSidebar
            key={index}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isCollapsed={isSidebarOpen}
            index={index}
          />
        ))}
      </div>
      <main className="flex flex-col w-full h-full transition-all duration-300">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
