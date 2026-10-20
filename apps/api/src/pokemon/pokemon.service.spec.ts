import { describe, it, expect, beforeEach, vi } from "vitest";
import { PokemonService } from "./pokemon.service";
import { PokeApiRepository } from "./poke-api.repository";
import type { Cache } from "cache-manager";

describe("PokemonService", () => {
  let service: PokemonService;
  let mockRepo: Partial<PokeApiRepository>;
  let mockCache: Partial<Cache>;

  beforeEach(() => {
    mockCache = {
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(undefined)
    };

    mockRepo = {
      fetchPokemonList: vi.fn().mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }]
      }),
      fetchPokemonByIdOrName: vi.fn().mockResolvedValue({
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        types: [{ slot: 1, type: { name: "grass", url: "" } }],
        stats: [{ base_stat: 45, effort: 0, stat: { name: "hp", url: "" } }],
        abilities: [{ is_hidden: false, slot: 1, ability: { name: "overgrow", url: "" } }],
        sprites: {
          front_default: "bulbasaur.png",
          front_shiny: null,
          other: { "official-artwork": { front_default: "bulbasaur-art.png" } }
        },
        species: { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" }
      }),
      fetchSpeciesByUrl: vi.fn().mockResolvedValue({
        evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" }
      }),
      fetchEvolutionChainByUrl: vi.fn().mockResolvedValue({
        chain: {
          species: { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
          evolution_details: [],
          evolves_to: []
        }
      })
    };

    service = new PokemonService(
      mockRepo as PokeApiRepository,
      mockCache as Cache
    );
  });

  it("deve retornar uma lista paginada de Pokémon e salvar no cache", async () => {
    const result = await service.getPokemonList(1, 0);

    expect(result.results).toHaveLength(1);
    expect(result.results[0]?.name).toBe("bulbasaur");
    expect(result.results[0]?.types).toContain("grass");
    expect(mockCache.set).toHaveBeenCalled();
  });

  it("deve retornar dados do cache se disponíveis", async () => {
    const cachedData = {
      results: [{ id: 25, name: "pikachu", types: ["electric"], sprite: "pikachu.png" }],
      total: 1,
      limit: 20,
      offset: 0,
      hasNext: false,
      hasPrevious: false
    };
    (mockCache.get as any).mockResolvedValueOnce(cachedData);

    const result = await service.getPokemonList(20, 0);

    expect(result).toEqual(cachedData);
    expect(mockRepo.fetchPokemonList).not.toHaveBeenCalled();
  });

  it("deve buscar detalhes do Pokémon e mapear o DTO limpo", async () => {
    const details = await service.getPokemonDetails(1);

    expect(details.id).toBe(1);
    expect(details.name).toBe("bulbasaur");
    expect(details.types).toEqual(["grass"]);
    expect(details.evolutionChain?.speciesName).toBe("bulbasaur");
  });
});

