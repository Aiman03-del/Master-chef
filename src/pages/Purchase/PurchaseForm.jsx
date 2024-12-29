import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../Auth/AuthContext";
import "./PurchaseStyles/PurchaseForm.css";

const PurchaseForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const axiosSecure = useAxiosSecure();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please log in to place an order.");
    }

    const orderData = {
      email: user.email,
      foodId: food._id,
      image: food.image,
      foodName: food.name,
      quantity,
      price: food.price * quantity,
      orderTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    axiosSecure
      .post("/orders", orderData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Order placed successfully!");
          setFood((prevFood) => ({
            ...prevFood,
            purchaseCount: (prevFood.purchaseCount || 0) + 1,
          }));
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place order.");
      });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!food) {
    return <div className="text-center mt-10">Food not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Food Details: {food.name}
      </motion.h1>
      <motion.form
        className="max-w-lg mx-auto"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            value={food.name}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-white"
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            value={`$${food.price}`}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-white"
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-white"
          />
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="block text-sm font-medium">Total Purchase</label>
          <input
            type="text"
            value={food.purchaseCount || 0}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-white"
          />
        </motion.div>

        <motion.div
          className="flex justify-center py-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            type="submit"
            className="sparkle-button text-white w-full sm:w-auto"
          >
            Purchase
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default PurchaseForm;
