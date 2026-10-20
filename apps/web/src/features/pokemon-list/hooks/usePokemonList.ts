import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon-list.api";
import type { PaginatedResultDTO, PokemonListItemDTO } from "@pokedex/types";

export interface UsePokemonListResult {
  data: PaginatedResultDTO<PokemonListItemDTO> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  currentPage: number;
  pageSize: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export function usePokemonList(pageSize: number = 20): UsePokemonListResult {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-list", pageSize, offset],
    queryFn: () => fetchPokemonList(pageSize, offset),
    staleTime: 1000 * 60 * 5 // 5 minutos no cliente
  });

  const nextPage = () => {
    if (data?.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    currentPage,
    pageSize,
    nextPage,
    previousPage,
    goToPage
  };
}

