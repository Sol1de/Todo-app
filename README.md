# Todo App

A project and task manager built with **Vue 3**, **TypeScript**, and **Tailwind CSS v4**. Designed as a learning
resource to demonstrate **SOLID principles**, **design patterns** (Factory, Singleton), and a clean **4-layer
architecture** in a real Vue application.

## Features

- Create projects with custom icons and descriptions
- Add tasks with priority levels (high, medium, low)
- Track completion progress per project
- Filter and manage tasks
- Data persisted automatically to localStorage

## Tech Stack

| Layer         | Technology                                 |
|---------------|--------------------------------------------|
| Framework     | Vue 3 (`<script setup>` + Composition API) |
| Language      | TypeScript (strict mode)                   |
| Build         | Vite 8                                     |
| Styling       | Tailwind CSS v4 via `@tailwindcss/vite`    |
| UI Components | shadcn-vue (new-york style) + reka-ui      |
| Icons         | Lucide (lucide-vue-next)                   |
| Utilities     | @vueuse/core, clsx, tailwind-merge         |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** (recommended package manager)

### Installation

```bash
# Clone the repository
git clone git@github.com:Sol1de/Todo-app.git
cd todo-app

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

```bash
pnpm dev       # Start Vite dev server with hot reload
pnpm build     # Type-check (vue-tsc) + production build
pnpm preview   # Preview the production build locally
```

## Architecture

The codebase follows a strict **4-layer architecture** where each layer has a single responsibility:

```
Component (UI)
    │
    ▼
Service (business logic + validation)
    │
    ▼
Factory (object construction)
    │
    ▼
Store (reactive state + persistence)
```

**Data flow:** `Component` → `Service.create(input)` → `validate()` → `Factory.create()` → `Store.add()` → reactive UI
update.

### Layers

| Layer         | Location         | Responsibility                                                                |
|---------------|------------------|-------------------------------------------------------------------------------|
| **Models**    | `src/models/`    | TypeScript interfaces — define the shape of `Project` and `Task`              |
| **Factories** | `src/factories/` | Static `create()` methods — build entities with IDs, timestamps, and defaults |
| **Stores**    | `src/stores/`    | Vue `reactive()` singletons — hold state and expose mutation functions        |
| **Services**  | `src/services/`  | Orchestrate validation → factory → store; all business rules live here        |

### Design Patterns

#### Factory Pattern (`src/factories/`)

Centralizes object creation. Each factory exposes a static `create(input)` method that transforms form data into a
complete entity (with UUID, timestamps, defaults). If the data structure changes, only the factory needs updating.

```
CreateProjectInput  ──▶  ProjectFactory.create()  ──▶  Project (with id, createdAt, defaults)
```

#### Singleton Pattern (`src/stores/`)

Stores are module-level `reactive()` objects. Since ES modules are loaded once, this is a natural singleton — every
component reading from the same store sees the same data. No class-based `getInstance()` needed.

### SOLID Principles

| Principle                 | How it's applied                                                                                                        |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Single Responsibility** | Each layer has exactly one job: models define shape, factories build, stores manage state, services own business rules  |
| **Open/Closed**           | New entity types are added via new factories and services, without modifying existing ones                              |
| **Liskov Substitution**   | Any implementation of an interface (e.g. `Task`) is substitutable without breaking callers                              |
| **Interface Segregation** | `CreateProjectInput` and `CreateTaskInput` are separate from `Project`/`Task` — consumers depend only on what they need |
| **Dependency Inversion**  | Services depend on model interfaces, not concrete implementations. Components receive data through props/emits          |

## Project Structure

```
src/
├── main.ts                        # App entry point
├── App.vue                        # Root component
├── config.ts                      # Centralized constants (storage keys)
├── style.css                      # Global styles
│
├── models/                        # Data shape interfaces
│   ├── Project.ts                 # Project + CreateProjectInput
│   └── Task.ts                    # Task + CreateTaskInput
│
├── factories/                     # Object construction
│   ├── ProjectFactory.ts          # Project creation with defaults
│   └── TaskFactory.ts             # Task creation with defaults
│
├── stores/                        # Reactive state (singletons)
│   ├── projectStore.ts            # Project state + mutations
│   └── taskStore.ts               # Task state + mutations
│
├── services/                      # Business logic
│   ├── ProjectService.ts          # Project validation + creation
│   ├── TaskService.ts             # Task validation + creation
│   └── StorageService.ts          # localStorage abstraction
│
├── components/
│   ├── layout/                    # App shell (sidebar, topbar)
│   ├── project/                   # Project display (header, completion, empty state)
│   ├── task/                      # Task CRUD (list, row, input, filters)
│   ├── dialogs/                   # Modal dialogs (create project, add task)
│   ├── utils/                     # Shared utilities (DynamicIcon, IconPicker)
│   └── ui/                        # shadcn-vue primitives (auto-generated)
│
└── lib/
    └── utils.ts                   # cn() helper for Tailwind class merging
```

## Persistence

State is automatically persisted to **localStorage** via `StorageService`. Stores load saved data on initialization and
call `persist()` after every mutation. Storage keys are centralized in `src/config.ts`.

No backend or database required — the app runs entirely in the browser.