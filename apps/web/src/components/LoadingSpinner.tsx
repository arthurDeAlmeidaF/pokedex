import React from "react";

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Carregando dados..."
}) => {
  return (
    <div
      role="progressbar"
      aria-label={message}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        gap: "16px"
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #E3350D",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <p style={{ color: "#666", fontSize: "0.95rem" }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

