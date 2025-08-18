import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function SiteLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 section-gap">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
