import type { PaginatedResultDTO, PokemonListItemDTO } from "@pokedex/types";

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PaginatedResultDTO<PokemonListItemDTO>> {
  const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémons: ${response.statusText}`);
  }
  return response.json();
}

