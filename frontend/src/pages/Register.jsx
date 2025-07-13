import { useState } from "react";
import axios from "axios";
import api from "../api/axios";
// import { useDispatch } from 'react-redux';
// import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: ''
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!form.password.length >= 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // else if (
    //   !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     "Must contain uppercase, number, special char, min 8 chars";
    // }

    // if (!form.confirmPassword) {
    //   newErrors.confirmPassword = "Confirm password is required";
    // } else if (form.password !== form.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match";
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
      const response = await api.post("/user/signup", form);

      if (response.status === 200) {
        // Store token for authenticated requests later
        localStorage.setItem("token", response.data.token);
        // dispatch(login({ name: form.name, email: form.email }));
        alert("Registration Successful");
        navigate("/login");
      }
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.message ?? err.message
      );
      // Optionally show an alert or set an error state:
      alert(
        `Registration failed: ${err.response?.data?.message ?? err.message}`
      );
    }
  };

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
            required
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

        {/* <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div> */}

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
