import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../Auth/AuthContext";
import Spinner from "../shared/Spinner";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/orders?email=${user.email}`)
      .then((response) => {
        setTimeout(() => {
          setOrders(response.data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://server-sigma-plum.vercel.app/orders/${id}?email=${user.email}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete the order.");
          }

          const updatedOrders = orders.filter((order) => order._id !== id);
          setOrders(updatedOrders);

          Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error!", "Failed to delete the order.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return <div className="text-center mt-10">No orders found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <AnimatePresence>
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              handleDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MyOrders;
