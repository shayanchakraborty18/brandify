import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/inputs/Inputs";
import login_gate from "../assets/images/sign-up.svg";


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
    <>
      <div className="my-8 lg:my-12">
        <div className="flex flex-col items-center">
          <div className="max-w-[768px] w-full bg-card rounded shadow flex">
            <div className="flex-1 flex flex-col items-center p-12 bg-primary/50 rounded-tl rounded-bl">
              <img src={login_gate} alt="Brandify" className="w-full h-full" />
            </div>
            <div className="w-xs p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Create an Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <div>
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {error.name && (
                    <p className="text-red-500 text-sm">{error.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Email"
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
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}</p>
                  )}
                </div>

                {error.server && (
                  <p className="text-red-500 text-sm">{error.server}</p>
                )}

                <button type="submit" className="btn w-full">
                  Sign Up
                </button>
              </form>
              <p className="text-center text-sm">
                Existing User? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
