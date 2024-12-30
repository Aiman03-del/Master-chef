import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { CiDark, CiSun } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { SiIfood } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/chef-hat.png";
import { AuthContext } from "../Auth/AuthContext";
import "./SharedStyles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const themeDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      className={`navbar shadow-md px-2 py-3 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-800" : "bg-transparent"
      } ${isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    >
      <div className="navbar-start flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center text:xl lg:text-3xl font-bold  border-black"
        >
          <img src={logo} alt="Logo" className="w-10" />
          <span className="whitespace-nowrap">Master Chef</span>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex gap-8">
        <Link
          to="/"
          className={`flex items-center gap-1 ${
            location.pathname === "/" ? "text-gray-500 font-bold" : ""
          }`}
        >
          <span className="text-xl">
            <FaHome />
          </span>{" "}
          Home
        </Link>
        <Link
          to="/all-foods"
          className={`flex items-center gap-1 ${
            location.pathname === "/all-foods" ? "text-gray-500 font-bold" : ""
          }`}
        >
          <span className="text-xl">
            <SiIfood />
          </span>
          All Foods
        </Link>
        <Link
          to="/gallery"
          className={`flex items-center gap-1 ${
            location.pathname === "/gallery" ? "text-gray-500 font-bold" : ""
          }`}
        >
          <span className="text-xl">
            <RiGalleryFill />
          </span>{" "}
          Gallery
        </Link>
      </div>
      <div className="navbar-end flex items-center gap-4">
        <div className="relative" ref={themeDropdownRef}>
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="btn text-2xl"
          >
            {isDarkMode ? <CiDark /> : <CiSun />}
          </button>
          {isDropdownOpen && (
            <div className="absolute top-[50px] right-0 text-gray-200 mt-2 shadow-lg rounded  bg-gray-800">
              <button
                onClick={() => setIsDarkMode(false)}
                className="px-4 py-2 hover:bg-gray-900 whitespace-nowrap"
              >
                Light Mode
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className="px-4 py-2 hover:bg-gray-900 whitespace-nowrap"
              >
                Dark Mode
              </button>
            </div>
          )}
        </div>
        {user ? (
          <>
            <div className="relative" ref={profileDropdownRef}>
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer transition-transform duration-300 transform hover:scale-110"
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsDropdownOpen(false);
                }}
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-10 text-gray-200 mt-2 shadow-lg rounded  bg-gray-800 ">
                  <Link
                    to="/"
                    className={`block lg:hidden px-4 py-2 hover:bg-gray-900 whitespace-nowrap ${
                      location.pathname === "/" ? "text-blue-500 font-bold" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/all-food"
                    className={`block lg:hidden px-4 py-2 hover:bg-gray-900 whitespace-nowrap ${
                      location.pathname === "/all-food"
                        ? "text-blue-500 font-bold"
                        : ""
                    }`}
                  >
                    All Food
                  </Link>
                  <Link
                    to="/gallery"
                    className={`block lg:hidden px-4 py-2 hover:bg-gray-900 whitespace-nowrap ${
                      location.pathname === "/gallery"
                        ? "text-blue-500 font-bold"
                        : ""
                    }`}
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/my-foods"
                    className="block px-4 py-2 hover:bg-gray-900  whitespace-nowrap"
                  >
                    My Foods
                  </Link>
                  <Link
                    to="/add-food"
                    className="block px-4 py-2 hover:bg-gray-900 whitespace-nowrap"
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-900 whitespace-nowrap"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-900 whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="rainbow-hover">
            <span className="sp">Login</span>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
