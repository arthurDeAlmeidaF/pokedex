import React from "react";

interface TypeBadgeProps {
  type: string;
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  normal: { bg: "#A8A77A", text: "#FFFFFF" },
  fire: { bg: "#EE8130", text: "#FFFFFF" },
  water: { bg: "#6390F0", text: "#FFFFFF" },
  electric: { bg: "#F7D02C", text: "#212121" },
  grass: { bg: "#7AC74C", text: "#FFFFFF" },
  ice: { bg: "#96D9D6", text: "#212121" },
  fighting: { bg: "#C22E28", text: "#FFFFFF" },
  poison: { bg: "#A33EA1", text: "#FFFFFF" },
  ground: { bg: "#E2BF65", text: "#212121" },
  flying: { bg: "#A98FF3", text: "#FFFFFF" },
  psychic: { bg: "#F95587", text: "#FFFFFF" },
  bug: { bg: "#A6B91A", text: "#FFFFFF" },
  rock: { bg: "#B6A136", text: "#FFFFFF" },
  ghost: { bg: "#70559B", text: "#FFFFFF" },
  dragon: { bg: "#6F35FC", text: "#FFFFFF" },
  dark: { bg: "#705746", text: "#FFFFFF" },
  steel: { bg: "#B7B7CE", text: "#212121" },
  fairy: { bg: "#D685AD", text: "#212121" }
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const normalizedType = type.toLowerCase();
  const theme = TYPE_COLORS[normalizedType] || { bg: "#777777", text: "#FFFFFF" };

  return (
    <span
      role="status"
      aria-label={`Tipo ${type}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        padding: "3px 10px",
        borderRadius: "14px",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        display: "inline-block"
      }}
    >
      {type}
    </span>
  );
};

