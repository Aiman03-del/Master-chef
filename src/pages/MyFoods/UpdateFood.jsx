import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../Auth/AuthContext";
import Spinner from "../shared/Spinner";

const UpdateFood = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch the food data by ID
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axiosSecure.get(`/foods/${id}`);
        if (response.data) {
          setFoodData(response.data);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axiosSecure.put(`/foods/${id}`, foodData);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: `The food "${foodData.name}" has been updated!`,
      }).then(() => {
        navigate(`/food/${id}`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while updating the food.",
      });
      console.error("Error updating food:", error);
    }
  };

  return (
    <motion.div
      className="update-food-page p-6 min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
        Update Food
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Read-only User Name */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium dark:text-gray-300"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user?.displayName || "Anonymous"}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium dark:text-gray-300"
            >
              Food Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium dark:text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={foodData.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium dark:text-gray-300"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={foodData.image}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-indigo-600 text-white dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Food"}
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default UpdateFood;
