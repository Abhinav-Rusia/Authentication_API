import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MotionButton = motion.button;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <MotionButton
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <Loader className="animate-spin size-6 mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </MotionButton>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Mail className="h-8 w-8 mx-auto text-white" />
            </motion.div>

            <p className="mt-4 text-gray-200 mb-6">
              We've sent an email to <span className="text-white">{email}</span>{" "}
              with instructions on how to reset your password.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          to="/login"
          className="text-sm text-green-400 hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Go to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
