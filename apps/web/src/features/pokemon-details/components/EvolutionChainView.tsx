import React from "react";
import type { EvolutionNodeDTO } from "@pokedex/types";

interface EvolutionChainViewProps {
  evolutionChain: EvolutionNodeDTO | null | undefined;
  onSelectPokemonId?: (id: number) => void;
}

export const EvolutionChainView: React.FC<EvolutionChainViewProps> = ({
  evolutionChain,
  onSelectPokemonId
}) => {
  if (!evolutionChain) {
    return null;
  }

  const renderNode = (node: EvolutionNodeDTO): React.ReactNode => {
    return (
      <div
        key={node.speciesId}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <button
          type="button"
          onClick={() => onSelectPokemonId?.(node.speciesId)}
          aria-label={`Ver evolução ${node.speciesName}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 12px",
            border: "1px solid #E0E0E0",
            borderRadius: "8px",
            backgroundColor: "#FAFAFA",
            cursor: onSelectPokemonId ? "pointer" : "default"
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.speciesId}.png`}
            alt={node.speciesName}
            style={{ width: "56px", height: "56px", objectFit: "contain" }}
          />
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#333"
            }}
          >
            {node.speciesName}
          </span>
          {node.minLevel && (
            <span style={{ fontSize: "0.7rem", color: "#777" }}>
              Nível {node.minLevel}
            </span>
          )}
          {node.item && (
            <span style={{ fontSize: "0.7rem", color: "#777" }}>
              Item: {node.item}
            </span>
          )}
        </button>

        {node.evolvesTo && node.evolvesTo.length > 0 && (
          <>
            <span aria-hidden="true" style={{ fontSize: "1.2rem", color: "#888" }}>
              &rarr;
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {node.evolvesTo.map((subNode) => renderNode(subNode))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "#333" }}>
        Cadeia Evolutiva
      </h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "12px",
          backgroundColor: "#F9F9F9",
          borderRadius: "8px",
          overflowX: "auto"
        }}
      >
        {renderNode(evolutionChain)}
      </div>
    </div>
  );
};

