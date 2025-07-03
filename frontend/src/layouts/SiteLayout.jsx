import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SiteLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
