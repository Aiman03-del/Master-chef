import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./SharedStyles/Foooter.css";

const Footer = () => {
  return (
    <footer className="bg-dark py-8 px-4">
      <div className="container mx-auto flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12">
        {/* Brand Name */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white">Master Chef</h2>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-6 justify-center text-2xl text-gray-400"
        >
          <a
            href="https://facebook.com"
            className="hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            className="hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg px-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Subscribe to Our Newsletter
          </h3>
          <form className="flex flex-row justify-between">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded  bg-black text-white dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="subscribe">Subscribe</button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 text-gray-400"
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
          className="text-sm text-gray-500"
        >
          © {new Date().getFullYear()} MyRestaurant. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
