// Import the necessary modules here
import nodemailer from "nodemailer";

export const contactMail = async (name, email) => {
  // Write your code here
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SMPT_MAIL_USERNAME,
      pass: process.env.SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "info@abc.com",
    to: email,
    subject: "Thank you for contacting us",
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Add your custom CSS styles here */
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
      }
      .logo {
        max-width: 150px;
      }
      .content {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #20d49a;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      /* Mobile Responsive Styles */
      @media only screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }
        .logo {
          max-width: 100px;
        }
        .button {
          display: block;
          margin-top: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          class="logo"
          src="../../public/images/logo1-32230.png"
          alt="Brandify Logo"
        />
        <h1> Contact Us </h1>
      </div>
      <div class="content">
        <p>Hello, ${name}</p>
        <p>
          Thank you for reaching out to us. We appreciate your interest in our services.
          Our team will get back to you as soon as possible.
        </p>
      </div>
    </div>
  </body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error : Unable to Send Welcome Email\n" + err);
  }
};
