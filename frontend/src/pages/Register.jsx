import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { user, loading, fetchUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});

  // ✅ Restrict if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/account", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
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
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post("/user/signup", form);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        await fetchUser();
        navigate("/account", { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message;
      setError({ server: msg });
    }
  };

  // While checking if logged in
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
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
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
        </div>

        {error.server && (
          <p className="text-red-500 text-sm">{error.server}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center">
        Existing User? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
