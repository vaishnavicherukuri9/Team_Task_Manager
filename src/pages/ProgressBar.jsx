import React from "react";

const ProgressBar = ({ progress }) => (
  <div style={{ background: "#eee", borderRadius: "10px", marginBottom: "1rem" }}>
    <div
      style={{
        width: `${progress}%`,
        backgroundColor: "#4caf50",
        height: "24px",
        borderRadius: "10px",
        textAlign: "center",
        color: "white"
      }}
    >
      {Math.round(progress)}%
    </div>
  </div>
);

export default ProgressBar;