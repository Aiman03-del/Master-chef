/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { name, image, price, quantity, _id } = food;

  return (
    <motion.div
      className="hover:shadow-xl transition duration-300 transform hover:-translate-y-2 rounded-lg shadow-lg p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="flex items-center justify-between">
        <div>
          <motion.h3
            className="mt-4 text-lg font-bold"
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 2 }}
            transition={{ duration: 1 }}
          >
            {name}
          </motion.h3>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 2.5 }}
            transition={{ duration: 0.8 }}
          >
            Price: ${price}
          </motion.p>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 2.5 }}
            transition={{ duration: 0.8 }}
          >
            Quantity: {quantity > 0 ? quantity : "Out of Stock"}
          </motion.p>
        </div>
        <div>
          <Link to={`/food/${_id}`}>
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 2.5 }}
              transition={{ duration: 0.8, delay: 1 }}
              disabled={quantity === 0}
              className={`mt-4 px-4 py-2 text-lg rounded-md ${
                quantity > 0
                  ? "bg-transparent text-black dark:text-white link-hover hover:text-blue-700"
                  : "bg-gray-400"
              }`}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
