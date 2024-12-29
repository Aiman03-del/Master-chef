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
import TitleWrapper from "../Title/TitleWrapper";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <TitleWrapper title="Home">
            <Home />
          </TitleWrapper>
        ),
      },
      {
        path: "*",
        element: (
          <TitleWrapper title="Not Found">
            <NotFound />
          </TitleWrapper>
        ),
      },
      {
        path: "/all-foods",
        element: (
          <TitleWrapper title="All Foods">
            <AllFoods />
          </TitleWrapper>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <TitleWrapper title="Food Details">
            <FoodDetails />
          </TitleWrapper>
        ),
      },
      {
        path: "/gallery",
        element: (
          <TitleWrapper title="Gallery">
            <Gallery />
          </TitleWrapper>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <TitleWrapper title="My Foods">
              <MyFoods />
            </TitleWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <TitleWrapper title="Update Food">
              <UpdateFood />
            </TitleWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <TitleWrapper title="Add Food">
              <AddFood />
            </TitleWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <TitleWrapper title="My Orders">
              <MyOrders />
            </TitleWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <TitleWrapper title="Purchase">
              <PurchaseForm />
            </TitleWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <TitleWrapper title="Login">
            <Login />
          </TitleWrapper>
        ),
      },
      {
        path: "/register",
        element: (
          <TitleWrapper title="Register">
            <Register />
          </TitleWrapper>
        ),
      },
    ],
  },
]);

export default router;
