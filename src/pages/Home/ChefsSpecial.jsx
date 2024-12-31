/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import "./HomeStyles/ChefsSpecial.css";

const chefs = [
  {
    id: 1,
    name: "Chef Mario Rossi",
    expertise: "Italian Cuisine",
    tagline: "Crafting flavors with passion.",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnTBlS9a1EeW_jIBx8W6itEwd_6uVW7TJtQ&s",
    featuredDish: {
      name: "Spaghetti Carbonara",
      image:
        "https://media.delight.video/0c18e53b610964fac175fe0e757adc30557e79b7/790e43d0a5925884291cf76b8250e1a5717cd4b7/POSTER_USER/v1/04d032b8-7ee2-44e9-8a5d-b53f03e71f46.jpg?quality=90",
      description:
        "A classic Italian pasta dish with creamy sauce and pancetta.",
    },
  },
  {
    id: 2,
    name: "Chef Amara Patel",
    expertise: "Desserts",
    tagline: "Turning sweetness into art.",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuty1UndVGAeRTdSale3qkD9V49fym1_PBg&s",
    featuredDish: {
      name: "Rasmalai Cake",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR60Y_aJmYszL_zK5EdgLKgotFmFj-KH5Zz3EzPIIdhXIprItm-BfhRv4rILMSQ1kaOzs&usqp=CAU",
      description: "A fusion of traditional Indian sweets with a modern twist.",
    },
  },
  {
    id: 3,
    name: "Chef Liam O'Connor",
    expertise: "French Pastries",
    tagline: "Bringing elegance to every bites.",
    photo:
      "https://media.licdn.com/dms/image/sync/v2/D4D27AQHTsmak77vUqw/articleshare-shrink_800/articleshare-shrink_800/0/1712061721844?e=2147483647&v=beta&t=eyOgvGlx4DBbdMwZkPQhKi2tVkn50fh00yvFmgDxWPQ",
    featuredDish: {
      name: "Croissant au Chocolat",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSghB25GnCJw0Eb10s5bmcrtsPcTtKtI4fo-w&s",
      description: "A buttery, flaky pastry filled with rich dark chocolate.",
    },
  },
];

const ChefsSpecial = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="py-10 bg-white text-black dark:bg-gray-950 dark:text-white">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.h2
        className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-8"
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0, y: 50 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        Chef's Special
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-5 max-w-7xl mx-auto"
      >
        {chefs.map((chef) => (
          <motion.div
            key={chef.id}
            className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white shadow-lg rounded-xl overflow-hidden transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="p-5">
              <motion.img
                src={chef.photo}
                alt={chef.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-200 dark:border-indigo-400"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold">{chef.name}</h3>
                <p className="text-sm">{chef.expertise}</p>
                <p className="mt-2">{chef.tagline}</p>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-300">
                  Featured Dish
                </h4>
                <div className="flex items-center mt-4">
                  <img
                    src={chef.featuredDish.image}
                    alt={chef.featuredDish.name}
                    className="w-16 h-16 rounded shadow-lg mr-4"
                  />
                  <div>
                    <p className="font-semibold">{chef.featuredDish.name}</p>
                    <p className="text-sm">{chef.featuredDish.description}</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <motion.button
                  onClick={() => {
                    toast.custom((t) => (
                      <div
                        className={`${
                          t.visible ? "animate-enter" : "animate-leave"
                        } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                      >
                        <div className="flex-1 w-0 p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={chef.photo}
                                alt={chef.name}
                              />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {chef.featuredDish.name}
                              </p>
                              <p className="mt-1 text-sm">{chef.tagline}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex border-l border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ));
                  }}
                  className="details"
                >
                  <FiInfo className="icon" />
                  <span className="more">More Details</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChefsSpecial;
