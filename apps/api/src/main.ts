import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`[BFF] Pokédex API iniciada com sucesso na porta ${port}: http://localhost:${port}/api`);
}

bootstrap();

