import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "./PokemonCard";
import type { PokemonListItemDTO } from "@pokedex/types";

describe("PokemonCard", () => {
  const mockPokemon: PokemonListItemDTO = {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://example.com/bulbasaur.png"
  };

  it("renderiza os detalhes do Pokémon e aciona o evento de seleção usando getByRole", () => {
    const handleSelect = vi.fn();

    render(<PokemonCard pokemon={mockPokemon} onSelect={handleSelect} />);

    // Validação usando acessibilidade getByRole
    const cardButton = screen.getByRole("button", {
      name: /ver detalhes de bulbasaur/i
    });
    expect(cardButton).toBeInTheDocument();

    // Validação dos tipos
    expect(screen.getByRole("status", { name: /tipo grass/i })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: /tipo poison/i })).toBeInTheDocument();

    // Simula interação do usuário
    fireEvent.click(cardButton);
    expect(handleSelect).toHaveBeenCalledWith(mockPokemon);
  });
});
