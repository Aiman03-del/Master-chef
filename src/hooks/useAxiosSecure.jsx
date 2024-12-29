import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://server-sigma-plum.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          signOutUser()
            .then(() => navigate("/signIn"))
            .catch((err) => console.log(err));
        }
        return Promise.reject(error);
      }
    );
  }, [signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
