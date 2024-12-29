import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

export default function MainLayout() {
  return (
    <div className="dark:bg-gray-950 dark:text-white bg-white text-black font-ysabeau">
      <Navbar></Navbar>
      <div className="mt-[72px] container mx-auto font-oswald min-h-[calc(100vh-22.95vh)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
