
import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [50, "Name can't exceed 50 characters"],
    minLength: [2, "Name should have at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    maxLength: [500, "Message can't exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Contact = mongoose.model("Contact", contactSchema);
    