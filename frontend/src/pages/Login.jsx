// pages/Login.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/inputs/Inputs";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate("/account", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
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

    setSubmitting(true);
    try {
      const res = await api.post("/user/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      // Fetch user before redirecting
      await fetchUser();

      const from = location.state?.from?.pathname || "/account";
      navigate(from, { replace: true });
    } catch (err) {
      setError({ server: err.response?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="section-gap">
        <div className="mt-12">
          <h2 className="text-2xl font-semibold uppercase">Login</h2>
          
            <div className="max-w-md mx-auto p-6 bg-card rounded shadow">
              {error.server && (
                <p className="text-red-500 text-sm text-center">
                  {error.server}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <div>
                  <Input
                    label={"Email"}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {error.email && (
                    <p className="text-red-500 text-sm">{error.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    label={"Password"}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}</p>
                  )}
                </div>

                <button type="submit" disabled={submitting} className="btn">
                  {submitting ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
              
            </div>
          
        </div>
      </div>
    </div>
  );
}
