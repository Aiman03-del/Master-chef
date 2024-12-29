import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../shared/Spinner";
import FoodCard from "./FoodCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(`/foods`, {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setFoods(response.data.foods || []);
        setTotalPages(
          Math.ceil((response.data.totalCount || 0) / itemsPerPage)
        );
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [searchQuery, currentPage, axiosSecure]);

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        All Foods
      </motion.h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {foods.length > 0 ? (
            foods.map((food) => (
              <motion.div
                key={food._id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full">No foods found.</p>
          )}
        </motion.div>
      )}

      {totalPages > 1 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      )}
    </motion.div>
  );
};

export default AllFoods;
