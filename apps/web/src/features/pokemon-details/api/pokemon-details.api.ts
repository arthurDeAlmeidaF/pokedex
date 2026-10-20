import type { PokemonDTO } from "@pokedex/types";

export async function fetchPokemonDetails(
  identifier: string | number
): Promise<PokemonDTO> {
  const response = await fetch(`/api/pokemon/${identifier}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar detalhes do Pokémon: ${response.statusText}`);
  }
  return response.json();
}

