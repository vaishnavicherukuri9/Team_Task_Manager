import React from "react";
import { Link } from "react-router-dom";

const HomeSplash = () => {
  return (
    <div
      style={{
        padding: "3rem",
        maxWidth: "600px",
        margin: "4rem auto",
        backgroundColor: "#e3f2fd",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        👋 Welcome back, Vaishnavi!
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#444" }}>
        Ready to launch your next brilliant idea?
      </p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/dashboard">
          <button
            style={{
              padding: "0.7rem 1.4rem",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            🚀 Dashboard
          </button>
        </Link>
        <Link to="/profile">
          <button
            style={{
              padding: "0.7rem 1.4rem",
              backgroundColor: "#388e3c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            👤 Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeSplash;