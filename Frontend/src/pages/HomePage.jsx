import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [greeting, setGreeting] = useState("Welcome");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const formatDate = (dateString) => {
    const options = { dateStyle: "medium", timeStyle: "short" };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all"
      >
        Logout
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-10 text-center shadow-2xl border border-gray-600 max-w-xl w-full"
      >
        <span className="text-6xl font-bold">👋🏻</span>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
          {greeting}
          {user?.name ? `, ${user.name}` : "!"}
        </h1>

        {/* Last Login */}
        {user?.lastLogin && (
          <p className="text-sm text-gray-400 mb-2">
            Last login: {formatDate(user.lastLogin)}
          </p>
        )}

        <p className="text-gray-300 text-lg">
          You're now on the{" "}
          <span className="text-emerald-400 font-semibold">HomePage</span>.{" "}
          <br />
          Explore, build, and make something amazing today.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold shadow-md hover:bg-emerald-600 transition"
        >
          Let's Go 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;
