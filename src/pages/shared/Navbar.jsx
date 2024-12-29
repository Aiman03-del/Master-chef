import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { CiDark, CiSun } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";
import { RiGalleryFill } from "react-icons/ri";
import { SiIfood } from "react-icons/si";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import "./SharedStyles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrollDropdownOpen, setIsScrollDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

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
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    setIsScrollDropdownOpen(false);
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
        setIsScrollDropdownOpen(false);
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
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="navbar-start flex items-center space-x-4">
        <div className="md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsScrollDropdownOpen(!isScrollDropdownOpen);
            }}
          >
            <HiMenu className="text-4xl text-black dark:text-white" />
          </button>
          {isScrollDropdownOpen && (
            <div className="absolute top-[70px] left-0 pr-10 text-gray-200  shadow-lg rounded  bg-gray-800">
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-900"
                onClick={() => setIsScrollDropdownOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-foods"
                className="block px-4 py-2 hover:bg-gray-900"
                onClick={() => setIsScrollDropdownOpen(false)}
              >
                All Foods
              </Link>
              <Link
                to="/gallery"
                className="block px-4 py-2 hover:bg-gray-900"
                onClick={() => setIsScrollDropdownOpen(false)}
              >
                Gallery
              </Link>
              {user ? (
                <>
                  <Link
                    to="/my-foods"
                    className="block px-4 py-2 hover:bg-gray-900"
                    onClick={() => setIsScrollDropdownOpen(false)}
                  >
                    My Foods
                  </Link>
                  <Link
                    to="/add-food"
                    className="block px-4 py-2 hover:bg-gray-900"
                    onClick={() => setIsScrollDropdownOpen(false)}
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-900"
                    onClick={() => setIsScrollDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-900"
                  onClick={() => setIsScrollDropdownOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
        <Link
          to="/"
          className="flex items-center text:xl lg:text-3xl font-bold hover:text-yellow-400 border-black"
        >
          <GrRestaurant className="text-3xl lg:text-5xl" />
          <span className="whitespace-nowrap">Master Chef</span>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex gap-8">
        <Link to="/" className="flex items-center gap-1 hover:text-yellow-400 ">
          <span className="text-xl">
            <FaHome />
          </span>{" "}
          Home
        </Link>
        <Link
          to="/all-foods"
          className="flex items-center gap-1 hover:text-yellow-400"
        >
          <span className="text-xl">
            <SiIfood />
          </span>
          All Foods
        </Link>
        <Link
          to="/gallery"
          className="flex items-center gap-1 hover:text-yellow-400"
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
              setIsScrollDropdownOpen(false);
            }}
            className="btn text-2xl hover:text-yellow-400"
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
                  setIsScrollDropdownOpen(!isScrollDropdownOpen);
                  setIsDropdownOpen(false);
                }}
              />
              {isScrollDropdownOpen && (
                <div className="absolute right-0 text-gray-200 mt-2 shadow-lg rounded w-40 bg-gray-800">
                  <Link
                    to="/my-foods"
                    className="block px-4 py-2 hover:bg-gray-900"
                  >
                    My Foods
                  </Link>
                  <Link
                    to="/add-food"
                    className="block px-4 py-2 hover:bg-gray-900"
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-900"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-900"
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
