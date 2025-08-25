import React, { useState } from "react";
import fg_image from "../assets/images/forgot-password.svg";
import Input from "../components/inputs/Inputs";
import { Link } from "react-router-dom";
import { postforgotPassword } from "../services/productService";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({ email: "" });

  const validateEmail = () => {
    if (!email) {
      setError({ email: "Email is required" });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ email: "Invalid email format" });
      return false;
    }
    setError({ email: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setSubmitting(true);

    try {
      const res = await postforgotPassword({ email });
      if (res.status === 200) {
        setEmail("");
        toast.success("Password reset link sent to your email");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error("Something went wrong, please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-8 lg:my-12">
        <div className="flex flex-col items-center">
          <div className="max-w-[768px] w-full bg-card rounded shadow flex">

            <div className="flex-1 flex flex-col items-center p-12 bg-primary/50 rounded-tl rounded-bl">
              <img src={fg_image} alt="Forgot Password" className="w-2/3" />
            </div>


            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Forgot Password
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <div>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email && (
                    <p className="text-red-500 text-sm">{error.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn w-full"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>

              <p className="text-center text-sm flex justify-between gap-2">
                <Link className="text-primary" to="/register">
                  Create an Account
                </Link>
                <Link className="text-primary" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
