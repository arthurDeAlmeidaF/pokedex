import React from "react";
import type { PokemonStatDTO } from "@pokedex/types";

interface PokemonStatsViewProps {
  stats: PokemonStatDTO[];
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Atq. Especial",
  "special-defense": "Def. Especial",
  speed: "Velocidade"
};

export const PokemonStatsView: React.FC<PokemonStatsViewProps> = ({ stats }) => {
  return (
    <div style={{ marginTop: "16px" }}>
      <h4 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "#333" }}>
        Estatísticas Base
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {stats.map((stat) => {
          const maxVal = 255;
          const percentage = Math.min(100, Math.round((stat.baseStat / maxVal) * 100));
          const label = STAT_LABELS[stat.name] || stat.name;

          return (
            <div
              key={stat.name}
              style={{
                display: "grid",
                gridTemplateColumns: "110px 40px 1fr",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.85rem"
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>{label}</span>
              <span style={{ fontWeight: 700, color: "#222" }}>{stat.baseStat}</span>
              <div
                role="progressbar"
                aria-valuenow={stat.baseStat}
                aria-valuemin={0}
                aria-valuemax={maxVal}
                aria-label={`Estatística de ${label}`}
                style={{
                  height: "8px",
                  backgroundColor: "#E0E0E0",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${percentage}%`,
                    backgroundColor: percentage > 45 ? "#4CAF50" : "#FF9800",
                    borderRadius: "4px",
                    transition: "width 0.4s ease-in-out"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

