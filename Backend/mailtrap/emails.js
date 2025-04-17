import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {

    const recipient = [{ email }]

    try {

        const resposne = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email Sent Successfully", resposne);


    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }

}

export const sendWelcomeEmail = async (email, name) => {

    const recipient = [{ email }]

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "5e6ebd5c-1a98-4677-87bd-d66381171c07",
            template_variables: {
                "name": name,
                company_info_name: "Auth Organisation",
            }
        })

        console.log("Email Sent Successfully", response);


    } catch (error) {

        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })

    }

}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Email Sent Successfully", response);

    } catch (error) {

        console.error(error.message);
        throw new Error(error.message)
    }
}

export const sendResetSuccessEmail = async (email) => {

    const recipient = [{ email }]

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Email Sent Successfully", response);

    } catch (error) {

        console.error(error.message);
        throw new Error(error.message)
    }
}