import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordValidation.test(password)) {
      toast.error(
        "Password must contain at least 6 characters, an uppercase and a lowercase letter."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register(email, password, name, photoURL);
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "You can now log in.",
        confirmButtonText: "Okay",
      });
      const user = { email: email };
      axios
        .post("https://server-sigma-plum.vercel.app/jwt", user)
        .then((data) => {
          console.log(data);
        });

      navigate("/all-foods");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen  p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <motion.p
          className="text-3xl font-bold text-center text-blue-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Register
        </motion.p>

        <div className="form-control text-black dark:text-white">
          <label className="label">
            <span>Full Name</span>
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="input input-bordered input-primary "
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span>Email</span>
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered input-primary"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span>Photo URL</span>
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter photo URL"
            className="input input-bordered input-primary"
          />
        </div>

        <div className="form-control relative">
          <label className="label">
            <span>Password</span>
          </label>
          <input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input input-bordered input-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-14 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="form-control relative">
          <label className="label">
            <span>Confirm Password</span>
          </label>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="input input-bordered input-primary"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-14 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full hover:scale-105 transition transform"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
