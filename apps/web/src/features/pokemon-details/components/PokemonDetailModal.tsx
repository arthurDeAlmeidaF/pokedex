import React from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { PokemonStatsView } from "./PokemonStatsView";
import { EvolutionChainView } from "./EvolutionChainView";
import { TypeBadge } from "../../../components/TypeBadge";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

interface PokemonDetailModalProps {
  pokemonId: number | string | null;
  onClose: () => void;
  onSelectPokemonId: (id: number) => void;
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemonId,
  onClose,
  onSelectPokemonId
}) => {
  const { pokemon, isLoading, isError, error } = usePokemonDetails(pokemonId);

  if (!pokemonId) {
    return null;
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px"
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "24px",
          position: "relative",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#F0F0F0",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666"
          }}
        >
          &times;
        </button>

        {isLoading && <LoadingSpinner message="Carregando detalhes do Pokémon..." />}

        {isError && (
          <div
            role="alert"
            style={{
              padding: "16px",
              color: "#D32F2F",
              backgroundColor: "#FFEBEE",
              borderRadius: "8px",
              marginTop: "24px"
            }}
          >
            <p style={{ fontWeight: 600 }}>Não foi possível carregar os detalhes.</p>
            <p style={{ fontSize: "0.85rem" }}>{error?.message}</p>
          </div>
        )}

        {pokemon && (
          <div>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#888"
                }}
              >
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h2
                id="dialog-title"
                style={{
                  margin: "4px 0 12px 0",
                  textTransform: "capitalize",
                  fontSize: "1.6rem",
                  color: "#222"
                }}
              >
                {pokemon.name}
              </h2>

              <img
                src={pokemon.sprites.officialArtwork || pokemon.sprites.frontDefault}
                alt={`Imagem oficial do Pokémon ${pokemon.name}`}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                  margin: "8px auto"
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  marginTop: "8px"
                }}
              >
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "8px",
                  fontSize: "0.9rem"
                }}
              >
                <div>
                  <span style={{ color: "#777", display: "block" }}>Altura</span>
                  <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
                </div>
                <div>
                  <span style={{ color: "#777", display: "block" }}>Peso</span>
                  <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
                </div>
              </div>
            </div>

            <PokemonStatsView stats={pokemon.stats} />

            <EvolutionChainView
              evolutionChain={pokemon.evolutionChain}
              onSelectPokemonId={onSelectPokemonId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

