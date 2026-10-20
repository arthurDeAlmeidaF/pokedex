import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./pokemon.service";
import { PokeApiRepository } from "./poke-api.repository";

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5
    })
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokeApiRepository],
  exports: [PokemonService]
})
export class PokemonModule {}

