🔐 Authentication API
A secure, modular, and scalable Node.js-based Authentication API built with Express.js, MongoDB, and JWT. It includes features like user signup, login, logout, email verification, forgot/reset password, and protected route access.

🚀 Features
✅ User Signup and Login

📧 Email Verification via OTP

🔐 JWT-based Authentication

🔁 Password Reset via Email

🛡️ Protected Routes Middleware

🌐 CORS and Cookie-based Session Handling

🧪 Built-in Error Handling and Validation

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT, Cookies

Email Service: Nodemailer

Environment Variables: dotenv

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/Abhinav-Rusia/Authentication_API.git
cd Authentication_API
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
⚠️ Replace values with your actual credentials.

4. Run the Server
npm run dev
Server will start on http://localhost:5000.

🔑 API Endpoints
Auth Routes (/api/auth)

Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Login user
POST	/logout	Logout user
POST	/verify-email	Verify email using OTP
POST	/forgot-password	Send password reset email
POST	/reset-password/:token	Reset password with token
GET	/check-auth	Check authentication status


🤝 Contribution
Contributions, issues, and feature requests are welcome!

📬 Contact
Made with ❤️ by Abhinav Rusia
