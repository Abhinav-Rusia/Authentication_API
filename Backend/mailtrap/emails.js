import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./email.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });

        console.log("Verification Email sent:", info.messageId);
    } catch (error) {
        console.error("Verification Email error:", error.message);
        throw new Error(error.message);
    }
};


export const sendWelcomeEmail = async (email, name) => {
    try {
        const htmlContent = `<h1>Welcome, ${name}!</h1><p>Thanks for joining Auth Organisation.</p>`;
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome to Auth Organisation",
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
        });

        console.log("Welcome Email sent:", info.messageId);
    } catch (error) {
        console.error("Welcome Email error:", error.message);
        throw new Error(error.message);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        });

        console.log("Password Reset Email sent:", info.messageId);
    } catch (error) {
        console.error("Password Reset Email error:", error.message);
        throw new Error(error.message);
    }
};


export const sendResetSuccessEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Reset Success Email sent:", info.messageId);
    } catch (error) {
        console.error("Reset Success Email error:", error.message);
        throw new Error(error.message);
    }
};
