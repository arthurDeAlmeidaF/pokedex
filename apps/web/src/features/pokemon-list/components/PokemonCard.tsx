import React from "react";
import type { PokemonListItemDTO } from "@pokedex/types";
import { TypeBadge } from "../../../components/TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonListItemDTO;
  onSelect: (pokemon: PokemonListItemDTO) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onSelect }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${pokemon.name}`}
      onClick={() => onSelect(pokemon)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(pokemon);
        }
      }}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "1px solid #EFEFEF"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
      }}
    >
      <span
        style={{
          alignSelf: "flex-end",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#888"
        }}
      >
        #{String(pokemon.id).padStart(3, "0")}
      </span>

      <img
        src={pokemon.sprite}
        alt={`Ilustração do Pokémon ${pokemon.name}`}
        loading="lazy"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          margin: "8px 0"
        }}
      />

      <h3
        style={{
          margin: "4px 0 8px 0",
          fontSize: "1.1rem",
          textTransform: "capitalize",
          color: "#2B2B2B"
        }}
      >
        {pokemon.name}
      </h3>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </article>
  );
};

