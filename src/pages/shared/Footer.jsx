import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./SharedStyles/Foooter.css";

const Footer = () => {
  return (
    <footer className="bg-dark py-8 px-4 ">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">Master Chef</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-6 justify-center text-2xl"
        >
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="hover:text-blue-600">
            <FaLinkedin />
          </a>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <h3 className="text-lg font-semibold mb-2">
            Subscribe to Our Newsletter
          </h3>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="subscribe">Subscribe</button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4"
        >
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm"
        >
          © {new Date().getFullYear()} MyRestaurant. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
