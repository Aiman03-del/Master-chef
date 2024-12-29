/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const GalleryCard = ({ image, title, description, onImageClick }) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl image-full cursor-pointer overflow-hidden rounded-lg"
      onClick={onImageClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <figure>
        <img src={image} alt={title} className="object-cover w-full h-48" />
      </figure>
      <div className="card-body flex flex-col justify-end p-4">
        <h2 className="card-title text-white">{title}</h2>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
