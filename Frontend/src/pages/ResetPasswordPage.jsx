import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, isLoading, error, message } = useAuthStore();
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);

      toast.success("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
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
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        {error && <div className="bg-red-500 text-white p-4 mb-4">{error}</div>}
        {message && (
          <div className="bg-green-500 text-white p-4 mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Password Input */}
          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mt-4">
            <Input
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-all"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
