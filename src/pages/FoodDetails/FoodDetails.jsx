import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../Auth/AuthContext";
import Spinner from "../shared/Spinner";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/foods/${id}`)
      .then((response) => {
        setFood(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food:", error);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;

  const handlePurchase = () => {
    if (food.quantity > 0 && food.addedBy?.email !== user?.email) {
      navigate(`/purchase/${id}`);
    }
  };

  return (
    <div className="p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold  mb-3 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {food.name}
      </motion.h2>
      <motion.div
        className="flex flex-row place-content-center items-center gap-6 p-6  shadow-xl rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={food.image}
          alt={food.name}
          className="w-[30%] h-72 object-cover rounded-lg"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        />

        <div className="p-4">
          <motion.p
            className="text-sm sm:text-base text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {food.description}
          </motion.p>

          <motion.p
            className="text-xl font-semibold text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Price: ${food.price}
          </motion.p>

          <motion.p
            className="text-sm sm:text-base text-gray-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            Purchase Count: {food.purchaseCount}
          </motion.p>

          <motion.p
            className={`text-sm sm:text-base mb-6 ${
              food.quantity === 0 ? "text-red-600" : "text-green-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {food.quantity > 0 ? `In Stock: ${food.quantity}` : "Out of Stock"}
          </motion.p>

          {food.addedBy?.email === user?.email ? (
            <motion.p
              className="text-red-600 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              You cannot purchase your own food!
            </motion.p>
          ) : (
            <motion.button
              onClick={handlePurchase}
              disabled={
                food.quantity === 0 || food.addedBy?.email === user?.email
              }
              className={`w-full py-2 rounded text-white ${
                food.quantity > 0 && food.addedBy?.email !== user?.email
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {food.quantity > 0 ? "Purchase Now" : "Out of Stock"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FoodDetails;
