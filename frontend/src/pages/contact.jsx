import React, { useState } from "react";
import contact_us from "../assets/images/undraw_contact.svg";
import Input from "../components/inputs/Inputs";
import { createContact } from "../services/productService";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const validateForm = () => {
  const newErrors = {};
  if (!form.name) {
    newErrors.name = "Name is required";
  } 
  if (!form.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!form.message) {
    newErrors.message = "Message is required";
  } else if (form.message.length < 50) {
    newErrors.message = "Message must be at least 50 characters";
  }
  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await createContact(form);
      console.log(res);
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      setError({});
    //   alert("Message sent successfully");
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      alert("Error sending message");
    }
  };


  return (
    <div className="container mx-auto px-4">
      <div className="section-gap">
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold uppercase">Contact Us</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded"></div>
        </div>
        
          <p className="text-center">
            If you have any questions or need further information, please feel
            free to contact us.
          </p>
        

        <div className="bg-card rounded shadow flex mb-12">
          <div className="flex-1 flex flex-col items-center p-12 bg-primary/50 rounded-tl rounded-bl">
            <img src={contact_us} alt="Brandify" />
          </div>
          <div className="w-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <Input
                  label={"Name"}
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
                  label={"message"}
                  type="text"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                {error.message && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn w-full"
              >
                {submitting ? "Sending..." : "Send"}
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};
