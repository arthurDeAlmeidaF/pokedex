import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/pokemon-details.api";
import type { PokemonDTO } from "@pokedex/types";

export interface UsePokemonDetailsResult {
  pokemon: PokemonDTO | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePokemonDetails(
  identifier: string | number | null
): UsePokemonDetailsResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-detail", identifier],
    queryFn: () => {
      if (!identifier) {
        throw new Error("Identificador inválido para Pokémon");
      }
      return fetchPokemonDetails(identifier);
    },
    enabled: Boolean(identifier),
    staleTime: 1000 * 60 * 15 // 15 minutos no cliente
  });

  return {
    pokemon: data,
    isLoading,
    isError,
    error: error as Error | null
  };
}

