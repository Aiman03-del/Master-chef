/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <motion.div
      className="flex justify-center items-center my-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="px-4 py-2 mx-1 text-2xl text-orange-500 rounded-md hover:text-blue-700 disabled:text-gray-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Previous Page"
      >
        <IoIosArrowDropleftCircle />
      </motion.button>

      <motion.div
        className="flex items-center space-x-2 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            key={page}
            onClick={() => setPage(page)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={`Page ${page}`}
          >
            {page}
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className="px-4 py-2 mx-1 text-2xl text-orange-500 rounded-md hover:text-blue-700 disabled:text-gray-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Next Page"
      >
        <IoIosArrowDroprightCircle />
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
