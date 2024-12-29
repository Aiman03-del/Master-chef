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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/all-foods", element: <AllFoods /> },
      { path: "/food/:id", element: <FoodDetails /> },
      { path: "/gallery", element: <Gallery /> },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <PurchaseForm />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
