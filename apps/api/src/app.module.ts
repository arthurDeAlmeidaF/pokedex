import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { PokemonModule } from "./pokemon/pokemon.module";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 30 * 1000 // 30 minutos
    }),
    PokemonModule
  ]
})
export class AppModule {}

