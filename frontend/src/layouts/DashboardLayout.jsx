import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <aside className="w-60 bg-gray-800 text-white p-4">
        <h2 className="text-lg mb-4">My Account</h2>
        <nav>
          <Link to="/account">Dashboard</Link>
          <Link to="/account/orders" className="block mt-2">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
