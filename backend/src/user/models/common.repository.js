import { Contact } from "./contact.schema.js";
import { Subscriber } from "./subscriber.schema.js";

export const contactUsRepo = async ({ name, email, message }) => {
  // Logic to save contact message to the database
  await Contact.create({
    name,
    email,
    message,
  });

  return { name, email, message };
}


export const subscribeRepo = async ({ email }) => {
  // Logic to save subscriber email to the database
  await Subscriber.create({ email });
  return { email };
}