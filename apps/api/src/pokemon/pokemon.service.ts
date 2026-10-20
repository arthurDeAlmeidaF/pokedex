import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import {
  PokeApiRepository,
  RawPokemonResponse,
  RawEvolutionChainLink
} from "./poke-api.repository";
import type {
  PokemonDTO,
  PokemonListItemDTO,
  PaginatedResultDTO,
  EvolutionNodeDTO
} from "@pokedex/types";

@Injectable()
export class PokemonService {
  private readonly CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutos

  constructor(
    private readonly pokeApiRepo: PokeApiRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async getPokemonList(
    limit: number = 20,
    offset: number = 0
  ): Promise<PaginatedResultDTO<PokemonListItemDTO>> {
    const cacheKey = `pokemon:list:${limit}:${offset}`;
    const cached = await this.cacheManager.get<PaginatedResultDTO<PokemonListItemDTO>>(cacheKey);
    if (cached) {
      return cached;
    }

    const rawList = await this.pokeApiRepo.fetchPokemonList(limit, offset);

    // Buscar detalhes básicos concorrentemente para ter sprite e tipos na listagem
    const items = await Promise.all(
      rawList.results.map(async (entry) => {
        const id = this.extractIdFromUrl(entry.url);
        // Tentar obter dados do cache individual primeiro
        const cachedItem = await this.cacheManager.get<PokemonDTO>(`pokemon:detail:${id}`);
        if (cachedItem) {
          return {
            id: cachedItem.id,
            name: cachedItem.name,
            types: cachedItem.types,
            sprite: cachedItem.sprites.officialArtwork || cachedItem.sprites.frontDefault
          };
        }

        const cachedSummary = await this.cacheManager.get<PokemonListItemDTO>(`pokemon:summary:${id}`);
        if (cachedSummary) {
          return cachedSummary;
        }

        try {
          const detail = await this.pokeApiRepo.fetchPokemonByIdOrName(id);
          const mapped = this.mapToPokemonDTO(detail);
          const summaryItem: PokemonListItemDTO = {
            id: mapped.id,
            name: mapped.name,
            types: mapped.types,
            sprite: mapped.sprites.officialArtwork || mapped.sprites.frontDefault
          };
          // Salvar resumo em cache
          await this.cacheManager.set(`pokemon:summary:${id}`, summaryItem, this.CACHE_TTL_MS);

          return summaryItem;
        } catch {
          return {
            id,
            name: entry.name,
            types: [],
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        }
      })
    );

    const result: PaginatedResultDTO<PokemonListItemDTO> = {
      results: items,
      total: rawList.count,
      limit,
      offset,
      hasNext: Boolean(rawList.next),
      hasPrevious: Boolean(rawList.previous)
    };

    await this.cacheManager.set(cacheKey, result, this.CACHE_TTL_MS);
    return result;
  }

  async getPokemonDetails(identifier: string | number): Promise<PokemonDTO> {
    const cacheKey = `pokemon:detail:${String(identifier).toLowerCase()}`;
    const cached = await this.cacheManager.get<PokemonDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    const rawPokemon = await this.pokeApiRepo.fetchPokemonByIdOrName(identifier);
    const dto = this.mapToPokemonDTO(rawPokemon);

    // Buscar cadeia evolutiva
    try {
      if (rawPokemon.species?.url) {
        const speciesData = await this.pokeApiRepo.fetchSpeciesByUrl(rawPokemon.species.url);
        if (speciesData.evolution_chain?.url) {
          const evolutionData = await this.pokeApiRepo.fetchEvolutionChainByUrl(
            speciesData.evolution_chain.url
          );
          dto.evolutionChain = this.mapEvolutionChain(evolutionData.chain);
        }
      }
    } catch {
      dto.evolutionChain = null;
    }

    // Armazenar no cache tanto pelo ID numérico quanto pelo nome
    await this.cacheManager.set(`pokemon:detail:${dto.id}`, dto, this.CACHE_TTL_MS);
    await this.cacheManager.set(`pokemon:detail:${dto.name}`, dto, this.CACHE_TTL_MS);

    return dto;
  }

  private mapToPokemonDTO(raw: RawPokemonResponse): PokemonDTO {
    return {
      id: raw.id,
      name: raw.name,
      height: raw.height,
      weight: raw.weight,
      types: raw.types.map((t) => t.type.name),
      sprites: {
        frontDefault: raw.sprites.front_default || "",
        frontShiny: raw.sprites.front_shiny || undefined,
        officialArtwork:
          raw.sprites.other?.["official-artwork"]?.front_default ||
          raw.sprites.front_default ||
          ""
      },
      stats: raw.stats.map((s) => ({
        name: s.stat.name,
        baseStat: s.base_stat
      })),
      abilities: raw.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden
      })),
      evolutionChain: null
    };
  }

  private mapEvolutionChain(chain: RawEvolutionChainLink): EvolutionNodeDTO {
    const speciesId = this.extractIdFromUrl(chain.species.url);
    const details = chain.evolution_details?.[0];

    return {
      speciesId,
      speciesName: chain.species.name,
      minLevel: details?.min_level ?? null,
      trigger: details?.trigger?.name ?? null,
      item: details?.item?.name ?? null,
      evolvesTo: (chain.evolves_to || []).map((subChain) => this.mapEvolutionChain(subChain))
    };
  }

  private extractIdFromUrl(url: string): number {
    const segments = url.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return Number(last) || 0;
  }
}

