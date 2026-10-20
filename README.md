# 🔴 Pokédex Avançada

Uma aplicação Pokédex resiliente, performática e modular de nível corporativo, construída em uma arquitetura **Monorepo** com **Turborepo 2.0**, **React (Vite)** no Frontend e um **BFF (Backend-For-Frontend)** em **NestJS**, consumindo a [PokeAPI](https://pokeapi.co).

---

## 🏛️ Arquitetura e Padrões Adotados

O projeto foi construído respeitando os seguintes padrões de design:

1. **Monorepo com Turborepo 2.0 & npm workspaces:**
   - Pipelines otimizadas com cache inteligente local para `build`, `dev`, `lint` e `test`.
   - TypeScript estrito compartilhado em todo o ecossistema.
2. **Backend-For-Frontend (BFF) com NestJS:**
   - Atua como orquestrador, agregador e limpador de dados da PokeAPI.
   - **Repository Pattern (`PokeApiRepository`):** Encapsula todas as chamadas HTTP externas.
   - **Camada de Cache Transparente:** Cache em memória para evitar requisições repetitivas a dados estáticos.
   - **DTOs Estritos:** O Frontend nunca acessa a PokeAPI diretamente; consome apenas o BFF.
3. **Feature-Driven Development (FDD) no Frontend:**
   - Código modularizado por domínios de negócio em `apps/web/src/features/` (`pokemon-list`, `pokemon-details`).
   - Barreiras estritas de exportação (`index.ts`) atuando como APIs públicas de cada feature.
4. **Custom Hooks Pattern:**
   - Separação completa de apresentação e estado assíncrono.
   - Componentes visuais declarativos consumindo dados via hooks (`usePokemonList`, `usePokemonDetails`) integrados ao **TanStack Query**.
5. **Estratégia de Testes Automatizados:**
   - **Testes Unitários & de Componentes:** Vitest + React Testing Library (RTL) com foco em acessibilidade (`getByRole`).
   - **Testes E2E:** Playwright validando os fluxos reais de ponta a ponta.

---

## 📁 Estrutura de Pastas

```text
pokedex/
├── apps/
│   ├── web/                         # Frontend React + Vite
│   │   ├── src/
│   │   │   ├── components/          # Componentes visuais globais (Header, Badges, etc.)
│   │   │   ├── features/            # Módulos FDD isolados (pokemon-list, pokemon-details)
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   └── e2e/                     # Testes ponta a ponta com Playwright
│   └── api/                         # Backend NestJS (BFF)
│       └── src/
│           ├── pokemon/             # Módulo do domínio Pokémon (Controller, Service, Repository)
│           ├── app.module.ts
│           └── main.ts
├── packages/                        # Configurações e pacotes compartilhados
│   ├── typescript-config/           # tsconfig bases (base, react, node)
│   ├── eslint-config/               # Configurações unificadas de linting
│   └── types/                       # Interfaces TypeScript e DTOs compartilhados
├── package.json                     # Raiz com workspaces configurados
├── turbo.json                       # Configurações de pipeline e cache do Turborepo
└── README.md
```

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

*   **Node.js**: Versão `>= 20.0.0` (Recomendado: LTS `v24.x` ou `v22.x`)
*   **npm**: Versão `>= 10.0.0` (incluso com o Node.js)
*   **Git**

---

## 🚀 Como Inicializar o Projeto Localmente

Siga o passo a passo abaixo para rodar a aplicação em qualquer computador:

### 1. Clonar o Repositório

```bash
git clone https://github.com/arthurDeAlmeidaF/pokedex.git
cd pokedex
```

### 2. Instalar as Dependências

Na raiz do repositório, execute:

```bash
npm install
```

> Este comando instalará as dependências da raiz e vinculará automaticamente todos os pacotes dos workspaces (`apps/web`, `apps/api`, `packages/*`).

### 3. Iniciar os Servidores em Modo de Desenvolvimento

Execute o script de desenvolvimento orquestrado pelo Turborepo:

```bash
npm run dev
```

O Turborepo iniciará automaticamente:
*   **Frontend (React + Vite):** [http://localhost:3000](http://localhost:3000)
*   **Backend BFF (NestJS):** [http://localhost:3001/api](http://localhost:3001/api)

> O Frontend já possui um proxy interno configurado no Vite: chamadas para `/api` no frontend são automaticamente redirecionadas para o backend na porta 3001.

---

## 🛠️ Comandos Disponíveis

Todos os comandos podem ser executados a partir da raiz do repositório:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o Frontend e o Backend em paralelo com Hot Module Replacement (HMR). |
| `npm run build` | Compila todos os pacotes e aplicações utilizando o cache do Turborepo. |
| `npm run test` | Executa todos os testes unitários e de componentes via Vitest. |
| `npm run test:e2e` | Executa os testes de ponta a ponta com o Playwright. |
| `npm run lint` | Executa a verificação estática de código com o ESLint. |

---

## 🧪 Rodando os Testes

### Testes Unitários e de Componentes

Para rodar os testes unitários do Backend e de componentes do Frontend:

```bash
npm run test
```

### Testes E2E (Playwright)

Para rodar os testes end-to-end com os servidores rodando:

```bash
npm run test:e2e
```

---

## 📦 Padrão de Commits

O projeto adota o padrão **Conventional Commits** com mensagens em português brasileiro, estruturados por contexto:

*   `feat(front): ...` - Novas funcionalidades na interface web.
*   `feat(back): ...` - Novas funcionalidades no BFF NestJS.
*   `chore(arch): ...` - Alterações de arquitetura, workspaces ou configs do Turborepo.
*   `test: ...` - Criação ou ajuste de testes unitários, de componentes ou E2E.
