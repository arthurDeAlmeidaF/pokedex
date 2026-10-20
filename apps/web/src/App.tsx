import React, { useState } from "react";
import { Header } from "./components/Header";
import { PokemonListFeature } from "./features/pokemon-list";
import { PokemonDetailModal } from "./features/pokemon-details";
import type { PokemonListItemDTO } from "@pokedex/types";

export const App: React.FC = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const handleSelectPokemon = (pokemon: PokemonListItemDTO) => {
    setSelectedPokemonId(pokemon.id);
  };

  const handleCloseModal = () => {
    setSelectedPokemonId(null);
  };

  const handleSelectEvolutionId = (id: number) => {
    setSelectedPokemonId(id);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4F5F7", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <PokemonListFeature onSelectPokemon={handleSelectPokemon} />
      </main>

      <PokemonDetailModal
        pokemonId={selectedPokemonId}
        onClose={handleCloseModal}
        onSelectPokemonId={handleSelectEvolutionId}
      />
    </div>
  );
};

export default App;

