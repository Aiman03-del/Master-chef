/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import moment from "moment";
import { RiDeleteBinFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const OrderCard = ({ order, handleDelete }) => {
  return (
    <motion.div
      className="rounded-lg p-4 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
    >
      <div className="w-full">
        <img
          src={order.image}
          alt={order.foodName}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </div>
      <div className="flex flex-row items-center ">
        <div>
          <h2 className="text-lg font-semibold">{order.foodName}</h2>
          <p className="text-sm">Price: ${order.price}</p>
          <p className="text-sm">Quantity: {order.quantity}</p>
          <p className="text-sm whitespace-nowrap">
            Ordered on:{" "}
            {moment(order.buyingDate).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>
        <motion.button
          onClick={() => handleDelete(order._id)}
          className="mt-4 text-red-600 px-4 py-2 rounded-md hover:text-gray-700 sm:mt-0"
          whileHover={{ scaleY: 1.05 }}
          whileTap={{ scaleY: 1 }}
          transition={{ duration: 1 }}
          data-tooltip-id="delete"
          data-tooltip-content="Delete"
        >
          <RiDeleteBinFill className="text-2xl" />
        </motion.button>
        <Tooltip id="delete" />
      </div>
    </motion.div>
  );
};

export default OrderCard;
