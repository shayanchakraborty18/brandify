import { contactMail } from "../../../utils/emails/contactMail.js";
import { subscribeMail } from "../../../utils/emails/subscribeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { contactUsRepo, subscribeRepo } from "../models/common.repository.js";

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    await contactUsRepo({ name, email, message });
    await contactMail(name, email);
    res.status(200).json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const subscribe = async (req, res, next) => {
  const { email } = req.body;
  try {
    await subscribeRepo({ email });
    await subscribeMail(email); 
    res.status(200).json({ success: true, msg: "Subscribed successfully" });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}