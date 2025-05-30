import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD  
    }
  });

export const sender = {
    email: process.env.EMAIL_USERNAME,
    name: "abhinavrusia",
};