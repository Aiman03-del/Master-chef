import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import "./AddFoodStyles/AddFood.css";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Desserts",
    "Beverages",
    "Snacks",
    "Appetizers",
    "Main Course",
    "Salads",
    "Soups",
    "Grilled",
    "Seafood",
    "BBQ",
    "Fast Food",
    "Breakfast",
    "Brunch",
    "Healthy",
    "Gluten-Free",
    "Keto",
    "Pasta",
    "Pizza",
    "Asian",
    "Indian",
    "Mediterranean",
    "Mexican",
    "Italian",
    "American",
    "Middle Eastern",
    "Street Food",
  ];

  const [foodData, setFoodData] = useState({
    name: "",
    image: "",
    category: categories[0],
    quantity: 1,
    price: "",
    purchaseCount: 0,
    addedBy: {
      name: user?.displayName || "Anonymous",
      email: user?.email || "N/A",
    },
    origin: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    const addFoodPromise = fetch("https://server-sigma-plum.vercel.app/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food item.");
        }
        return response.json();
      })
      .then((data) => {
        navigate(`/food/${data._id}`);
        setFoodData({
          name: "",
          image: "",
          category: categories[0],
          quantity: 1,
          price: "",
          purchaseCount: 0,
          addedBy: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "N/A",
          },
          origin: "",
          description: "",
        });
      });

    toast.promise(addFoodPromise, {
      loading: "Adding food item...",
      success: "Food item added successfully!",
      error: "An error occurred while adding the food item.",
    });
  };

  return (
    <div className="add-food-page bg-white text-black dark:bg-gray-950 dark:text-white p-4 sm:p-6 lg:p-10">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
        Add Food Item
      </h1>
      <form
        onSubmit={handleAddFood}
        className="add-food-form flex flex-col  gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col">
            Food Name:
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Food Image (URL):
            <input
              type="url"
              name="image"
              value={foodData.image}
              onChange={handleChange}
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Food Category:
            <select
              name="category"
              value={foodData.category}
              onChange={handleChange}
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={foodData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Price:
            <input
              type="number"
              name="price"
              value={foodData.price}
              onChange={handleChange}
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Added By:
            <input
              type="text"
              name="addedBy"
              value={foodData.addedBy.name}
              readOnly
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Your Email:
            <input
              type="email"
              name="email"
              value={foodData.addedBy.email}
              readOnly
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col">
            Food Origin:
            <input
              type="text"
              name="origin"
              value={foodData.origin}
              onChange={handleChange}
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
          <label className="flex flex-col md:col-span-2">
            Description:
            <textarea
              name="description"
              value={foodData.description}
              onChange={handleChange}
              rows="5"
              required
              className="text-lg input-field text-white p-4 rounded-lg"
            />
          </label>
        </div>
        <div className="w-48 mx-auto">
          <button type="submit" className="sparkle-button w-full text-white">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
