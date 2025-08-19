import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EMAIL_ADDRESS, EMAIL_PASS } from './configuration.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASS  
  }
});

export default transporter;
