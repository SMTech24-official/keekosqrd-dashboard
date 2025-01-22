import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ProtectedRoute from "@/components/ui/ProtectedRoute/ProtectedRoute";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute roles={["admin", "user"]}> 
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

export default Layout;
