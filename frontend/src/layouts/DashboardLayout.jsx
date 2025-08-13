import { Outlet } from "react-router-dom";
import { AccountSidebar } from "../components/common/AccountSidebar";

export default function DashboardLayout() {
  return (
    
      <div className="flex flex-1">
        <AccountSidebar />
        <main className="flex-1 p-12 bg-background min-h-[calc(100vh-150px)]">
          <Outlet />
        </main>
      </div>
    
  );
}
