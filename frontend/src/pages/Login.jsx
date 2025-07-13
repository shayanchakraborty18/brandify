import { useState } from "react";
import api from '../api/axios'
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
// import { login } from '../features/auth/authSlice'; // action from authSlice

export default function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // else if (
    //   !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     "Must contain uppercase, number, special char, min 8 chars";
    // }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/user/login",form);

      if (response.status === 200) {
        // Store token for authenticated requests later
        localStorage.setItem("token", response.data.token);

        navigate("/account");
        alert("Login successful");
      }
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message ?? err.message
      );
      // Optionally show an alert or set an error state:
      alert(`Login failed: ${err.response?.data?.message ?? err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
