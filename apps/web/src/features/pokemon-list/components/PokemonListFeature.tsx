import React from "react";
import type { PokemonListItemDTO } from "@pokedex/types";
import { usePokemonList } from "../hooks/usePokemonList";
import { PokemonCard } from "./PokemonCard";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

interface PokemonListFeatureProps {
  onSelectPokemon: (pokemon: PokemonListItemDTO) => void;
}

export const PokemonListFeature: React.FC<PokemonListFeatureProps> = ({
  onSelectPokemon
}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    pageSize,
    nextPage,
    previousPage
  } = usePokemonList(20);

  if (isLoading) {
    return <LoadingSpinner message="Carregando pokémons da Pokédex..." />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#D32F2F",
          backgroundColor: "#FFEBEE",
          borderRadius: "8px",
          margin: "24px auto",
          maxWidth: "600px"
        }}
      >
        <p style={{ fontWeight: 600 }}>Erro ao carregar Pokédex</p>
        <p style={{ fontSize: "0.9rem" }}>{error?.message || "Tente novamente mais tarde."}</p>
      </div>
    );
  }

  const pokemons = data?.results || [];

  return (
    <section aria-label="Catálogo de Pokémons">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px 0"
        }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={onSelectPokemon}
          />
        ))}
      </div>

      {data && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.total}
          pageSize={pageSize}
          hasNext={data.hasNext}
          hasPrevious={data.hasPrevious}
          onNext={nextPage}
          onPrevious={previousPage}
        />
      )}
    </section>
  );
};

