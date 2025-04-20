import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "");
    if (!pasted) return;

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);

    const nextIndex = pasted.length >= 6 ? 5 : pasted.length;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");
      navigate("/");
    } catch (error) {
      console.error("Email verification error:", error);
    }
  };

  useEffect(() => {
    const tryAutoSubmit = async () => {
      if (code.every((digit) => digit !== "")) {
        await handleSubmit({ preventDefault: () => {} });
      }
    };
    tryAutoSubmit();
  }, [code]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                autoFocus={index === 0}
                className="w-12 h-12 text-center text-xl font-semibold text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 transition-all"
              />
            ))}
          </div>
        </form>

        {error && (
          <p className="text-red-500 text-center font-semibold mt-4">
            {error.message}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 cursor-pointer 
            focus:outline-none transition duration-200"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || code.some((digit) => !digit)}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
