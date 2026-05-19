# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This is a **todo-app** — a project/task manager built with Vue 3 and TypeScript. The codebase must strictly follow **SOLID principles** and the **Singleton** and **Factory** design patterns.

## Commands

```bash
pnpm dev          # Start Vite dev server
pnpm build        # Type-check (vue-tsc) then build for production
pnpm preview      # Preview production build locally
```

No test runner or linter is configured. Type-checking is done via `vue-tsc -b` (part of build).

## Infrastructure

Redis is available via Docker Compose (`docker compose up -d`). Not yet wired into the app — intended for future persistence.

## Tech Stack

- **Vue 3** with `<script setup>` SFCs and TypeScript
- **Vite 8** with `@tailwindcss/vite` plugin (Tailwind CSS v4)
- **shadcn-vue** (new-york style, Geist Sans font) — UI primitives in `src/components/ui/`, built on **reka-ui**
- **Lucide** icons via `lucide-vue-next`
- `@` path alias resolves to `src/`

## Architecture

4-layer architecture (detailed in ARCHITECTURE.md):

1. **Models** (`src/models/`) — TypeScript interfaces only (`Project`, `Task` and their `Create*Input` counterparts)
2. **Factories** (`src/factories/`) — Static `create()` methods that build entities from form input (add IDs, timestamps, defaults)
3. **Stores** (`src/stores/`) — Vue `reactive()` singletons exporting state and mutation functions (not Pinia)
4. **Services** (`src/services/`) — Orchestrate validation → factory → store; business rules live here

**Data flow:** Component → `Service.create(input)` → `Service.validate()` → `Factory.create()` → `Store.add()` → reactive UI update.

Most store/service/factory methods currently throw `"Not implemented"` — this is the skeleton awaiting implementation.

## SOLID Principles

Reference documentation (source of truth): https://design-patterns.teepan.fr/solid

All code must respect the five SOLID principles:

### S — Single Responsibility
Each layer has exactly one reason to change. Models define data shape, factories handle construction, stores manage state, services own business rules. If you catch yourself describing a unit with "and" (fetches data **and** transforms it **and** displays it), split it.

### O — Open/Closed
Open for extension, closed for modification. When adding new entity types or behaviors, extend via new classes/strategies rather than modifying existing working code. Factories can be extended with new methods without changing `create()`.

### L — Liskov Substitution
Subtypes must maintain the contract of their parent. Any implementation of an interface must be substitutable without breaking callers. If a subtype cannot fulfill the full contract, the interface needs splitting (see ISP).

### I — Interface Segregation
Prefer small, focused interfaces. `CreateProjectInput` and `CreateTaskInput` are separate from `Project`/`Task` — consumers depend only on what they need. Don't build god-interfaces that force dependents to know about unrelated methods.

### D — Dependency Inversion
Services depend on model interfaces (`Project`, `Task`), not on concrete implementations. Components receive data through props/emits, not by reaching into stores directly. High-level modules and low-level modules both depend on abstractions.

## Design Patterns

Reference documentation (source of truth): https://design-patterns.teepan.fr/introduction/choisir-un-pattern

**Always start from the problem, never from the pattern.** A pattern is justified only if it removes a concrete pain point.

### Factory Pattern
Ref: https://design-patterns.teepan.fr/creationnels/factory

Used in `src/factories/`. Centralizes object creation so construction logic (ID generation, timestamps, defaults) is never duplicated across components. Each factory exposes a static `create(input)` method that transforms raw form data into a complete entity. If the data structure changes, only the factory needs updating.

### Singleton Pattern
Ref: https://design-patterns.teepan.fr/creationnels/singleton

Used in `src/stores/`. In ES modules, a module is loaded once — this is a natural singleton. The stores export a single `reactive()` state object shared across the entire app. All components reading from the same store see the same data. No need for class-based `getInstance()` — the module system handles it.

### Choosing a Pattern
Use this decision table from the reference docs when considering new patterns:

| Symptom | Pattern |
|---------|---------|
| Value hardcoded in multiple places | Singleton (centralized config) |
| Duplicated creation logic | Factory |
| Coupling to an external API | Adapter |
| Repeated class modifications | Decorator |
| Conditionals based on context | Strategy |
| Reacting to changes without coupling | Observer |

## UI Structure

- `App.vue` — root component, manages project/task dialog state
- `src/components/layout/` — shell: `AppLayout` (sidebar + main), `SideNavBar`, `TopAppBar`
- `src/components/project/` — project CRUD UI (header, creation dialog, empty state, completion card)
- `src/components/task/` — task CRUD UI (list, row, input, filters, add dialog)
- `src/components/ui/` — shadcn-vue primitives (do not edit manually; regenerate via `npx shadcn-vue@latest`)

## Conventions

- State is managed via module-level `reactive()` singletons, not Pinia or Vuex
- ARCHITECTURE.md is written in French — keep it in French when updating
- The project uses `pnpm` (lockfile is `pnpm-lock.yaml`)
