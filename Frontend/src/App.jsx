import React, { useEffect } from "react";
import FloatingShape from "./components/FloatingShape.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/AuthStore.js";
import HomePage from "./pages/HomePage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Protected Route that requires user authentication

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (!user.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }

  return children;
};

// Direct Autheticated user to home page

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-emerald-800
      flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating Blobs */}
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="top-[10%]"
        left="left-[5%]"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="top-[30%]"
        left="left-[75%]"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="top-[65%]"
        left="left-[30%]"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
