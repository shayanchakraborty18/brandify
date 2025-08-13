import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function SiteLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 section-gap">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
