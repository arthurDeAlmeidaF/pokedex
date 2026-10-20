import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

export interface RawPokemonListResult {
  name: string;
  url: string;
}

export interface RawPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawPokemonListResult[];
}

export interface RawPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface RawPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface RawPokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface RawPokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface RawPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: RawPokemonType[];
  stats: RawPokemonStat[];
  abilities: RawPokemonAbility[];
  sprites: RawPokemonSprites;
  species: {
    name: string;
    url: string;
  };
}

export interface RawSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

export interface RawEvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    min_level?: number | null;
    trigger?: {
      name: string;
    } | null;
    item?: {
      name: string;
    } | null;
  }>;
  evolves_to: RawEvolutionChainLink[];
}

export interface RawEvolutionChainResponse {
  chain: RawEvolutionChainLink;
}

@Injectable()
export class PokeApiRepository {
  private readonly baseUrl = "https://pokeapi.co/api/v2";

  constructor(private readonly httpService: HttpService) {}

  async fetchPokemonList(limit: number, offset: number): Promise<RawPokemonListResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<RawPokemonListResponse>(`${this.baseUrl}/pokemon`, {
          params: { limit, offset }
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        "Falha ao buscar listagem de pokémons na PokeAPI",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async fetchPokemonByIdOrName(identifier: string | number): Promise<RawPokemonResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<RawPokemonResponse>(
          `${this.baseUrl}/pokemon/${String(identifier).toLowerCase()}`
        )
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new HttpException("Pokémon não encontrado", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        "Falha ao consultar detalhes do Pokémon na PokeAPI",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async fetchSpeciesByUrl(speciesUrl: string): Promise<RawSpeciesResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<RawSpeciesResponse>(speciesUrl)
      );
      return response.data;
    } catch {
      throw new HttpException(
        "Falha ao consultar espécie do Pokémon na PokeAPI",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async fetchEvolutionChainByUrl(chainUrl: string): Promise<RawEvolutionChainResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<RawEvolutionChainResponse>(chainUrl)
      );
      return response.data;
    } catch {
      throw new HttpException(
        "Falha ao consultar cadeia evolutiva na PokeAPI",
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}

