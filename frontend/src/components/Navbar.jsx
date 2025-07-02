import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../features/auth/authSlice';

export default function Navbar() {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const isLoggedIn = false; // Placeholder for authentication state
    
    // Uncomment the following lines if using Redux for authentication
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogout = () => {
    // dispatch(logout());
    navigate('/login');
  };


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Brandify
        </Link>

        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>

          {isLoggedIn ? (
            <>
              <Link to="/account" className="hover:text-blue-600 transition">My Account</Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
