import { motion } from "framer-motion";
import "./SharedStyles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <motion.div
        className="flex items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: 3 }}
        transition={{ duration: 1.6 }}
      >
        <div className="spinner">
          <div className="spinnerin" />
        </div>
      </motion.div>
    </div>
  );
};

export default Spinner;
