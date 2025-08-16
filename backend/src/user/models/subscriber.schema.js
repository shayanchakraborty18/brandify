
import mongoose from "mongoose";
import validator from "validator";
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],    
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Subscriber = mongoose.model("Subscriber", subscriberSchema);