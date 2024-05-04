import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import logger from '../config/logger';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const mail = process.env.MAIL;

// OAuth2 credentials
const OAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret
);

OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: mail,
        clientId,
        clientSecret,
        refreshToken
    },
});

// Email sending function
async function sendEmail(email, token) {
    const mailOptions = {
        from: mail,
        to: email,
        subject: "Password Reset",
        html: `<h1>Password Reset</h1>
      <p>Click to proceed with your password reset</p>
      <a href="http://localhost:3000/api/v1/users/resetPassword/${token}">Reset Password</a>
      `,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${email}`);
        return result;
    } catch (error) {
        logger.error(`Error sending email to ${email}: ${error.message}`);
        throw error;
    }
}

export default sendEmail;
