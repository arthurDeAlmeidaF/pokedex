# Documento de Contexto Técnico e Arquitetura: Pokedex Avançada

Este documento serve como a única fonte da verdade (Single Source of Truth) para as decisões de arquitetura, padrões de design e ferramentas técnicas adotadas no desenvolvimento do projeto Pokedex. Ele foi estruturado para fornecer o contexto contextual exato para agentes de IA que auxiliam no desenvolvimento do código.

---

## 1. Visão Geral do Sistema
O objetivo é construir uma aplicação Pokedex resiliente, performática e modular de nível corporativo, consumindo a [PokeAPI](https://pokeapi.co). O sistema será composto por um ecossistema **Monorepo** que hospeda um **Frontend em React** e um **Backend (BFF - Backend-For-Frontend)** em **NestJS** atuando como agregador, limpador e orquestrador de dados.

---

## 2. Decisões Técnicas Principais (A Stack)

*   **Gerenciador de Monorepo:** [Turborepo 2.0](https://blog.logrocket.com/advanced-monorepo-management-turborepo/ "Turborepo 2.0 Monorepo Management") para orquestração de pipelines em cache local e otimização de scripts.
*   **Linguagem Base:** TypeScript estrito em todo o ecossistema.
*   **Frontend:** React (SPA alimentado por Vite) combinado com [TanStack Query (React Query)](https://tanstack.com "TanStack Query state management") para estado assíncrono.
*   **Backend (BFF):** [NestJS Framework](https://nestjs.com "NestJS Framework") para impor uma arquitetura escalável orientada a objetos (Modules, Controllers, Services).
*   **Testes de Componente e Unidade:** Vitest + React Testing Library (RTL).
*   **Testes End-to-End (E2E):** Playwright executando fluxos completos de ponta a ponta.

---

## 3. Estrutura de Pastas e Espaço de Trabalho (Workspace)

O ecossistema utiliza Workspaces e o [Turborepo](https://blog.logrocket.com/advanced-monorepo-management-turborepo/ "Turborepo Initial Setup") para isolar aplicações de pacotes de configuração compartilhados:

```text
/ (raiz do repositório)
├── apps/
│   ├── web/                         # Frontend React + Vite
│   │   └── src/
│   │       ├── components/          # Elementos de UI globais/genéricos
│   │       ├── features/            # Domínios e regras de negócio isoladas
│   │       └── main.tsx
│   └── api/                         # Backend NestJS (BFF)
│       └── src/
│           ├── pokemon/             # Módulo encapsulado de domínio do Pokémon
│           └── main.ts
├── packages/                        # Configurações globais e contratos
│   ├── typescript-config/           # tsconfig.json base compartilhado
│   ├── eslint-config/               # Regras de linting unificadas
│   └── types/                       # Interfaces TypeScript/DTOs compartilhados
├── package.json
└── turbo.json                       # Configurações de pipeline e cache
```

---

## 4. Padrões de Arquitetura Obrigatórios

Qualquer código gerado para este projeto deve respeitar estritamente os quatro padrões arquiteturais abaixo:

### A. Feature-Driven Development (FDD) no Frontend
Dentro de `apps/web/src/features/`, o código deve ser fatiado por domínios de negócio (ex: `pokemon-list`, `pokemon-details`). 
*   Cada funcionalidade deve se comportar como um miniaplicativo isolado contendo seus próprios componentes visuais, hooks específicos e chamadas de API internas.
*   **Regra de Fronteira estrita:** Uma funcionalidade nunca pode importar módulos diretamente de outra. A comunicação externa deve acontecer apenas se o recurso for exportado por um arquivo de barreira (`index.ts`) atuando como uma API pública do módulo.

### B. Custom Hooks Pattern (Separação de Apresentação e Estado)
Componentes visuais de UI não devem conter lógica de busca de dados (`fetch`, `useEffect` ou chamadas diretas ao `useQuery`).
*   Toda a lógica de requisição, paginação, mapeamento e manipulação de estado deve ser abstraída em um **Custom Hook** (ex: `usePokemonDetails(id)`).
*   O componente React deve ser puramente declarativo e atuar apenas como a camada de renderização dos dados fornecidos pelo Hook.

### C. BFF (Backend-For-Frontend) com Data Transfer Objects (DTO)
O backend NestJS deve funcionar estritamente como um intermediário inteligente. 
*   A PokeAPI retorna esquemas de dados massivos e fragmentados (especialmente para cadeias evolutivas). O serviço do NestJS deve orquestrar múltiplas chamadas concorrentes à PokeAPI, limpar os payloads brutos e estruturar um objeto estrito tipado (`PokemonDTO`).
*   O Frontend React **nunca** faz requisições diretas para a PokeAPI; ele consome unicamente o BFF.

### D. Repository Pattern e Camada de Cache no Backend
*   As chamadas HTTP do backend direcionadas à PokeAPI externa devem ser totalmente isoladas dentro de uma classe que implementa o padrão Repository (ex: `PokeApiRepository`).
*   O serviço de negócio (`PokemonService`) deve depender apenas dessa abstração e integrar uma camada de cache (In-Memory ou Redis) de forma transparente para evitar requisições repetitivas a dados estáticos dos Pokémon.

---

## 5. Diretrizes para Escrita de Testes

*   **Testes de Componentes (Frontend):** Devem focar no comportamento do usuário a partir da perspectiva de acessibilidade (usando queries como `getByRole`), simulando interações reais. Mocar estados de rede se necessário utilizando ferramentas nativas do ecossistema.
*   **Testes E2E (Playwright):** Devem validar o fluxo completo do usuário no frontend interagindo diretamente com as rotas reais do BFF integrado no Monorepo, garantindo que a jornada do usuário permaneça intacta.

---
**Instrução ao Agente de IA:** Ao propor novas implementações, refatorações ou correções de bugs, garanta que todas as estruturas respeitem rigorosamente o encapsulamento por features, as tipagens compartilhadas em `packages/types` e a separação clara de responsabilidades proposta.
