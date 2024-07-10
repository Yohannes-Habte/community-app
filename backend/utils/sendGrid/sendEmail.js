import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

/** 
 Prerequisites
    1. SendGrid Account: Sign up for a SendGrid account to get an API key.
    2. Node.js Package: Install the SendGrid package.
Steps
    1.  Install SendGrid Package => Navigate to your backend directory and install SendGrid:
        npm install @sendgrid/mail

Setup SendGrid Configuration: refer to the function below
 */

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: "uelandrae@gmail.com", // Use the email address or domain you verified with SendGrid
    subject,
    text,
  };
  sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((error) => console.error(error));
};

export default sendEmail;
