/* eslint-disable react/prop-types */
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebaseConfig";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        try {
          await updateProfile(userCredential.user, { displayName, photoURL });
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    );
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("state captured", currentUser?.email);
      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post("https://server-sigma-plum.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://server-sigma-plum.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }

      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        forgotPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
