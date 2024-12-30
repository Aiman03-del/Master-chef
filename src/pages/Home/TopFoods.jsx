import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../shared/Spinner";
import "./HomeStyles/TopFoods.css";

const TopFoods = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get("/foods");

        const foods = response.data.foods;

        if (Array.isArray(foods)) {
          const validFoods = foods.filter((food) => {
            const purchaseCount = parseInt(food.purchaseCount, 10);

            return !isNaN(purchaseCount);
          });

          const sortedFoods = validFoods
            .map((food) => ({
              ...food,
              purchaseCount: parseInt(food.purchaseCount, 10) || 0,
            }))
            .sort((a, b) => b.purchaseCount - a.purchaseCount);
          console.log(sortedFoods);

          setTopFoods(sortedFoods.slice(0, 6));
        } else {
          console.error("API response foods is not an array:", foods);
        }

        setTimeout(() => setLoading(false), 2000);
      } catch (error) {
        console.error("Error fetching top foods:", error);
        setLoading(false);
      }
    };

    fetchTopFoods();
  }, [axiosSecure]);

  return (
    <div className="py-12 text-center dark:text-white text-black">
      <motion.h2
        ref={ref}
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.8 }}
      >
        Top Selling Foods
      </motion.h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-6 md:px-10 max-w-7xl mx-auto">
            {topFoods.map((food) => (
              <motion.div
                key={food._id}
                className="relative rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 group transform transition-all hover:scale-105"
                onMouseEnter={() => setHoveredCard(food._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  animate={
                    hoveredCard === food._id ? { opacity: 1 } : { opacity: 0 }
                  }
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {food.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    {food.description}
                  </p>
                  <div className="flex justify-between w-[80%]">
                    <p className="text-lg font-bold text-white whitespace-nowrap">
                      Total Sell: {food.purchaseCount}
                    </p>
                    <Link to={`/food/${food._id}`}>
                      <motion.button className="text-sm font-semibold sm:text-base bg-transparent text-white px-6 py-2 border rounded-full hover:bg-white hover:text-black transition-all duration-300">
                        <motion.span
                          initial={{ y: 0, opacity: 1 }}
                          animate={
                            hoveredCard === food._id
                              ? { y: [0, 20, -10, 0], opacity: [1, 0, 0.5, 1] }
                              : { y: 0, opacity: 1 }
                          }
                          transition={{ duration: 1, ease: "backInOut" }}
                        >
                          Details
                        </motion.span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="pt-10">
            <Link to="/all-foods">
              <motion.button
                className="all-foods"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                See All Foods
                <div className="hover-effect">
                  <div />
                </div>
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopFoods;
