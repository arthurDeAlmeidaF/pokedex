import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonDetailModal } from "./PokemonDetailModal";
import * as detailsHook from "../hooks/usePokemonDetails";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe("PokemonDetailModal", () => {
  it("não renderiza nada se nenhum ID de Pokémon for fornecido", () => {
    const { container } = renderWithClient(
      <PokemonDetailModal pokemonId={null} onClose={vi.fn()} onSelectPokemonId={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza o modal acessível com dados do Pokémon", () => {
    vi.spyOn(detailsHook, "usePokemonDetails").mockReturnValue({
      pokemon: {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        types: ["electric"],
        sprites: {
          frontDefault: "pikachu.png",
          officialArtwork: "pikachu-art.png"
        },
        stats: [{ name: "hp", baseStat: 35 }],
        abilities: [{ name: "static", isHidden: false }],
        evolutionChain: null
      },
      isLoading: false,
      isError: false,
      error: null
    });

    const handleClose = vi.fn();

    renderWithClient(
      <PokemonDetailModal pokemonId={25} onClose={handleClose} onSelectPokemonId={vi.fn()} />
    );

    // Validação com query de acessibilidade getByRole('dialog')
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Valida botão fechar acessível
    const closeBtn = screen.getByRole("button", { name: /fechar detalhes/i });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Valida estatística com getByRole('progressbar')
    expect(screen.getByRole("progressbar", { name: /estatística de hp/i })).toBeInTheDocument();
  });
});
