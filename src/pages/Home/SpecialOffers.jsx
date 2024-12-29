import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "./HomeStyles/SpeacialOffers.css";

const SpecialOffers = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="py-16 px-6 bg-white text-black dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          ref={ref}
          className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0, y: 50 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Special Offers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="p-6 rounded-lg shadow-md bg-gray-100 text-black dark:bg-gray-800 dark:text-white flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-xl font-semibold">
              10% Off on Your First Order
            </h3>
            <p className="mt-2">
              Enjoy a 10% discount on your first food order. Use code FIRST10 at
              checkout.
            </p>
            <div className="py-4">
              <Link to="/all-foods">
                <button className="orders">
                  {" "}
                  Order Now
                  <div className="hoverEffect">
                    <div />
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow-md bg-gray-100 text-blawhiteck dark:bg-gray-800 dark:text-white flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-xl font-semibold">
              Free Drink with Every Meal
            </h3>
            <p className="mt-2">
              Get a free drink with every meal you order. Limited time offer!
            </p>
            <div className="py-4">
              <Link to="/all-foods">
                <button className="orders">
                  {" "}
                  Order Now
                  <div className="hoverEffect">
                    <div />
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow-md bg-gray-100 text-black dark:bg-gray-800 dark:text-white flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-xl font-semibold">
              Buy 1 Get 1 Free on Select Dishes
            </h3>
            <p className="mt-2">
              Buy one dish from our special menu and get another one for free!
            </p>
            <div className="py-4">
              <Link to="/all-foods">
                <button className="orders">
                  {" "}
                  Order Now
                  <div className="hoverEffect">
                    <div />
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
