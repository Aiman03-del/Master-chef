/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importing eye icons
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import "./AuthStyles/Login.css";

const Login = () => {
  const { login, loginWithGoogle, forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await login(email, password);
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "You have successfully logged in.",
        confirmButtonText: "Okay",
      });
      const user = { email: email };
      axios
        .post("https://server-sigma-plum.vercel.app/jwt", user, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "You have successfully logged in with Google.",
        confirmButtonText: "Okay",
      });
      const user = { email: email };
      axios
        .post("https://server-sigma-plum.vercel.app/jwt", user, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset the password.");
      return;
    }
    try {
      await forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: "Password reset email sent!",
        text: "Check your inbox for the reset link.",
        confirmButtonText: "Okay",
      });
      setIsForgotPassword(false);
    } catch (error) {
      toast.error(
        error.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <div className="form-container mx-auto my-10 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4">
      <p className="title text-2xl sm:text-3xl font-semibold text-center mb-6">
        Login
      </p>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          className="input w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!isForgotPassword && (
          <label className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </label>
        )}

        {isForgotPassword ? (
          <div className="forgot-password-form">
            <p className="text-sm text-center mb-4">
              Enter your email to receive a reset link.
            </p>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="form-btn w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Send Reset Link
            </button>
            <p
              className="text-blue-500 text-sm text-center cursor-pointer mt-4"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </p>
          </div>
        ) : (
          <>
            <p className="page-link text-center mb-4">
              <span
                className="page-link-label cursor-pointer text-blue-500"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </span>
            </p>
            <button
              type="submit"
              className="form-btn w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Log in
            </button>
          </>
        )}
      </form>
      <Link
        to="/register"
        className="text-xs sign-up-label text-center mt-4 block text-blue-500"
      >
        Don't have an account? <span className="sign-up-link">Register</span>
      </Link>
      <div className="buttons-container mt-6">
        <div
          onClick={handleGoogleLogin}
          className="google-login-button w-full p-3 border border-gray-300 flex justify-center items-center space-x-2 rounded-md hover:bg-gray-800 hover:text-white transition cursor-pointer"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            version="1.1"
            x="0px"
            y="0px"
            className="google-icon w-5 h-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          <span>Log in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
