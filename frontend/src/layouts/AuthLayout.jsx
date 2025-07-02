import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      {/* <header className="p-4 bg-white shadow">Public Navbar</header> */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
