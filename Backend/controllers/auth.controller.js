import bcrypt from "bcryptjs"
import crypto from "crypto"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"



export const signup = async (req, res) => {

    const { email, password, name } = req.body

    try {

        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({ email })

        if (userAlreadyExists) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
        })

        await user.save()

        // JWT 

        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}

export const verifyEmail = async (req, res) => {

    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        user.isVerified = true
        user.__v = 1
        user.verificationToken = undefined
        user.verificationExpiresAt = undefined

        await user.save()

        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            throw new Error("All fields are required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User is not verified. Please verify your email first"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()

        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}


export const forgotPassword = async (req, res) => {

    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        // Send reset password email

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const resetpassword = async (req, res) => {

    try {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        await sendResetSuccessEmail(user.email)

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}