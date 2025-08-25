import React, { useState } from "react";
import Input from "../inputs/Inputs";
import { subscribe } from "../../services/productService";
import { toast } from "react-toastify";

export const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await subscribe({ email: email });
      if (res.status === 200) {
        setEmail("");
      }
      toast.success(res.data.msg);
    } catch (err) {
      console.error(err, "Email Subscribe Error");
      setError("Subscription failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <p className="text-sm">
        Subscribe to our newsletter and get updates on new products and
        discounts.
      </p>
      <Input
        type="email"
        placeholder="Enter your email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="btn btn-tertiary uppercase">
        Subscribe
      </button>
    </form>
  );
};
