import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      role="banner"
      style={{
        backgroundColor: "#E3350D",
        color: "#FFFFFF",
        padding: "16px 24px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          aria-hidden="true"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "4px solid #30A7D7",
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
          }}
        />
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>
          Pokédex Avançada
        </h1>
      </div>
      <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
        <span>Monorepo FDD &bull; NestJS BFF</span>
      </div>
    </header>
  );
};

