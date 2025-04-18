import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) res.status(401).json({ success: false, message: "Unauthorized - No token provided" })

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })

        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({ success: false, message: error.message })
    }

}