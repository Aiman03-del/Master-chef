/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const MyFoodCard = ({ food, index, handleUpdate }) => {
  const navigate = useNavigate();
  return (
    <motion.tr
      key={food._id}
      className="border-b hover:bg-gray-500 transition-all"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <td className="px-4 py-3 ">{index + 1}</td>
      <td className="px-4 py-3">
        <img
          src={food.image}
          alt={food.name}
          className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
        />
      </td>
      <td className="px-4 py-3 ">{food.name}</td>
      <td className="px-4 py-3 ">${Number(food.price).toFixed(2)}</td>
      <td className="px-4 py-3 ">{food.quantity}</td>
      <td className="flex flex-row items-center justify-center  px-4 py-3 space-x-4">
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.5 }}
          onClick={() => handleUpdate(food._id)}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          data-tooltip-id="update"
          data-tooltip-content="Update Food"
        >
          <FaEdit size={20} />
        </motion.button>
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(`/food/${food._id}`)}
          className="text-green-500 hover:text-green-700 transition-colors duration-300"
          data-tooltip-id="details"
          data-tooltip-content="View Details"
        >
          <FaInfoCircle size={20} />
        </motion.button>
        <Tooltip id="update" type="dark" />
        <Tooltip id="details" type="dark" />
      </td>
    </motion.tr>
  );
};

export default MyFoodCard;
