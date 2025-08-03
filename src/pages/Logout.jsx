import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setHasLoggedOut(true);
      setTimeout(() => {
        navigate("/login"); // adjust route as needed
      }, 1500);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {!hasLoggedOut ? (
        <>
          <h2>See you soon 👋</h2>
          <p>Click below to log out of your session.</p>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🚪 Log Out
          </button>
        </>
      ) : (
        <h3>✅ You’ve been logged out!</h3>
      )}
    </div>
  );
};

export default Logout;