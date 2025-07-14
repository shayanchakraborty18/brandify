import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function SiteLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen section-gap">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
