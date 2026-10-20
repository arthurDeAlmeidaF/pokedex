export interface PokemonStatDTO {
  name: string;
  baseStat: number;
}

export interface PokemonAbilityDTO {
  name: string;
  isHidden: boolean;
}

export interface PokemonSpritesDTO {
  frontDefault: string;
  frontShiny?: string;
  officialArtwork: string;
}

export interface EvolutionNodeDTO {
  speciesId: number;
  speciesName: string;
  minLevel?: number | null;
  trigger?: string | null;
  item?: string | null;
  evolvesTo: EvolutionNodeDTO[];
}

export interface PokemonListItemDTO {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface PokemonDTO {
  id: number;
  name: string;
  height: number; // in decimetres
  weight: number; // in hectograms
  types: string[];
  sprites: PokemonSpritesDTO;
  stats: PokemonStatDTO[];
  abilities: PokemonAbilityDTO[];
  evolutionChain?: EvolutionNodeDTO | null;
}

export interface PaginatedResultDTO<T> {
  results: T[];
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

