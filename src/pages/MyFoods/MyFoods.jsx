import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../Auth/AuthContext";
import Spinner from "../shared/Spinner";
import MyFoodCard from "./MyFoodCard";

const MyFoods = () => {
  const { user } = useAuth();
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyFoods = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/all-foods");
        setMyFoods(response.data.foods || []);
      } catch (error) {
        console.error("Failed to fetch user-specific foods:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyFoods();
    }
  }, [user, axiosSecure]);

  const handleUpdate = (foodId) => {
    navigate(`/update-food/${foodId}`);
  };

  return (
    <div className="my-foods-page p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">My Foods</h1>
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg shadow-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <table className="table-auto w-full text-left border-separate border-spacing-0.5">
            <thead>
              <tr className="bg-gray-400 dark:bg-gray-800">
                <th className="px-4 py-2 font-semibold text-lg">No</th>
                <th className="px-4 py-2 font-semibold text-lg">Food Image</th>
                <th className="px-4 py-2 font-semibold text-lg">Food Name</th>
                <th className="px-4 py-2 font-semibold text-lg">Price</th>
                <th className="px-4 py-2 font-semibold text-lg">Quantity</th>
                <th className="px-4 py-2 font-semibold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.length > 0 ? (
                myFoods.map((food, index) => (
                  <MyFoodCard
                    key={food._id}
                    food={food}
                    index={index}
                    handleUpdate={handleUpdate}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default MyFoods;
