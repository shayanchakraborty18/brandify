import React, { useState } from "react";
import fg_image from "../assets/images/forgot-password.svg";
import Input from "../components/inputs/Inputs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword as resetPasswordService } from "../services/productService";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({ password: "", confirmpassword: "" });
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePasswords = () => {
    let valid = true;
    let errors = { password: "", confirmpassword: "" };

    if (!password) {
      errors.password = "New password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!confirmpassword) {
      errors.confirmpassword = "Confirm password is required";
      valid = false;
    } else if (password !== confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
      valid = false;
    }
    setError(errors);
    return valid;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setSubmitting(true);
    try {
      const res = await resetPasswordService(token, { password });
      if (res.status === 200) {
        setPassword("");
        setConfirmPassword("");
        toast.success(res.data.msg);
        navigate("/login");
        console.log(res)
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      toast.error("Something went wrong, please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  console.log(token)

  return (
    <div className="container mx-auto px-4">
      <div className="my-8 lg:my-12">
        <div className="flex flex-col items-center">
          <div className="max-w-[768px] w-full bg-card rounded shadow flex">

            <div className="flex-1 flex flex-col items-center p-12 bg-primary/50 rounded-tl rounded-bl">
              <img src={fg_image} alt="Brandify" className="w-2/3" />
            </div>


            <div className="w-full max-w-md p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Reset Password
              </h2>

              <form onSubmit={handleReset} className="space-y-4 mb-4">
                <div>
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {error.confirmpassword && (
                    <p className="text-red-500 text-sm">
                      {error.confirmpassword}
                    </p>
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
