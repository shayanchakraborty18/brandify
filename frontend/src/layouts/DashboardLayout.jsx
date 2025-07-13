import { Outlet } from "react-router-dom";
import { AccountSidebar } from "../components/AccountSidebar";

export default function DashboardLayout() {
  return (
    
      <div className="flex">
        <AccountSidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    
  );
}
