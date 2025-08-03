import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase"; // Adjust path if needed
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div>Checking login...</div>;

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;