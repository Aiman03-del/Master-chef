import { Helmet } from "react-helmet";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AddFood from "../pages/AddFood/AddFood";
import AllFoods from "../pages/AllFoods/AllFoods";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import Gallery from "../pages/Gallery/Gallery";
import Home from "../pages/Home/Home";
import MyFoods from "../pages/MyFoods/MyFoods";
import UpdateFood from "../pages/MyFoods/UpdateFood";
import MyOrders from "../pages/MyOrders/MyOrders";
import NotFound from "../pages/NotFound/NotFound";
import PurchaseForm from "../pages/Purchase/PurchaseForm";
import PrivateRoute from "./PrivateRoute";

// Helmet wrapper to dynamically set the page title
const withHelmet = (Component, title) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: withHelmet(Home, "Home - Master Chef") },
      {
        path: "*",
        element: withHelmet(NotFound, "404 Not Found - Master Chef"),
      },
      {
        path: "/all-foods",
        element: withHelmet(AllFoods, "All Foods - Master Chef"),
      },
      {
        path: "/food/:id",
        element: withHelmet(FoodDetails, "Food Details - Master Chef"),
      },
      {
        path: "/gallery",
        element: withHelmet(Gallery, "Gallery - Master Chef"),
      },
      {
        path: "/my-foods",
        element: withHelmet(
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>,
          "My Foods - Master Chef"
        ),
      },
      {
        path: "/update-food/:id",
        element: withHelmet(
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>,
          "Update Food - Master Chef"
        ),
      },
      {
        path: "/add-food",
        element: withHelmet(
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>,
          "Add Food - Master Chef"
        ),
      },
      {
        path: "/my-orders",
        element: withHelmet(
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>,
          "My Orders - Master Chef"
        ),
      },
      {
        path: "/purchase/:id",
        element: withHelmet(
          <PrivateRoute>
            <PurchaseForm />
          </PrivateRoute>,
          "Purchase - Master Chef"
        ),
      },
      { path: "/login", element: withHelmet(Login, "Login - Master Chef") },
      {
        path: "/register",
        element: withHelmet(Register, "Register - Master Chef"),
      },
    ],
  },
]);

export default router;
