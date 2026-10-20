import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import type { PokemonDTO, PokemonListItemDTO, PaginatedResultDTO } from "@pokedex/types";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonList(
    @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number
  ): Promise<PaginatedResultDTO<PokemonListItemDTO>> {
    return this.pokemonService.getPokemonList(limit, offset);
  }

  @Get(":identifier")
  async getPokemonDetails(@Param("identifier") identifier: string): Promise<PokemonDTO> {
    return this.pokemonService.getPokemonDetails(identifier);
  }
}

