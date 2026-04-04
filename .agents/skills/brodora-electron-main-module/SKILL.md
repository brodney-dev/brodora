---
name: brodora-electron-main-module
description: Adds a new NestJS feature module to the Brodora Electron main process with typed IPC via BrodoraApiHandler, handleBrodoraApi, and shared api contracts. Use when creating main-process modules, ipcMain handlers, renderer-facing APIs, or extending core/brodora after DatabaseModule/UsersModule patterns.
---

# Brodora Electron main module (Nest + typed IPC)

## Context

- **Package**: `core/brodora` — Electron **main** process only (no HTTP server).
- **DI**: NestJS via **`NestFactory.createApplicationContext()`** in `src/main/index.ts` — modules, `Injectable` services, **`onModuleInit`**, no `listen()`.
- **IPC**: **`ipcMain.handle`** is wrapped by **`handleBrodoraApi`** (`system/types/api.ts`) so **channel**, **Zod input**, and **handler** stay aligned. **`BrodoraApiHandler`** (in `shared/api/_common/api.ts`) holds **`key`** + **`inputValidator`** / **`outputValidator`**.
- **Shared contract**: Define procedures in **`shared/api/<feature>.api.ts`** and export **`BrodoraApi.<feature>`** from **`shared/api/index.ts`**. Main registers in **`onModuleInit`** with **`handleBrodoraApi`**. Preload exposes **`window.api`** = **`CallableBrodoraApi`** (`setupBrodoraApi(BrodoraApi.<feature>)`) — e.g. **`window.api.users.list()`** returns **`Promise<Option<...>>`**. No raw **`ipcRenderer.invoke`** in renderer code.

## Locations (under `core/brodora/src/main/`)

| Artifact | Path |
|----------|------|
| Root Nest module | `modules/app.module.ts` — `AppModule.forRoot()` **`imports`** |
| Global DB (reference) | `modules/database/database.module.ts` — **`TypeOrmModule.forRootAsync`**, **`better-sqlite3`**, **`migrationsRun: true`**, **`migrations: typeOrmMigrationClasses`** |
| Entities | `entities/*.entity.ts`, barrel `entities/index.ts` |
| TypeORM migrations | `migrations/<timestamp>-<Name>.ts` (filename must start with a digit). Auto-registered via **`migrations/index.ts`** (`import.meta.glob("./[0-9]*.ts")`); do not list classes in **`DatabaseModule`**. |
| Feature example | `modules/users/` — `users.module.ts`, `users.service.ts`; contracts in **`shared/api/users.api.ts`** |
| IPC + handler helpers | `system/types/api.ts` — **`handleBrodoraApi`** |
| DB access | **`@InjectRepository(Entity)`** in feature modules; **`@InjectDataSource()`** for raw SQL / legacy helpers |
| Preload surface | `src/preload/api.ts` — **`CallableBrodoraApi`**; `index.d.ts` — **`window.api`** |
| Tooling | `tsconfig.node.json` — `experimentalDecorators`, `emitDecoratorMetadata`; `core/brodora/biome.json` — `unsafeParameterDecoratorsEnabled` for `@Inject` |

## Module types

### 1. Global infrastructure module (like `DatabaseModule`)

- **`static forRoot(userDataDir): DynamicModule`** with **`global: true`**, **`TypeOrmModule.forRootAsync`**, **`entities`**, **`migrations: typeOrmMigrationClasses`**, **`synchronize: false`**, **`migrationsRun: true`** (runs pending migrations on startup).
- DB file: **`<userData>/storage/brodora.sqlite`** (WAL enabled in the initial migration).
- Feature modules use **`TypeOrmModule.forFeature([Entity])`** and **`@InjectRepository`**.

### 2. Feature module (like `UsersModule`)

- **`@Module({ imports: [TypeOrmModule.forFeature([Entity])], providers: [XxxService] })`** when using TypeORM.
- **`XxxService`**: **`implements OnModuleInit`** to register IPC with **`handleBrodoraApi`**.
- Inject **`@InjectRepository(MyEntity)`** or **`@InjectDataSource()`** as needed.

### 3. API contract (`shared/api/<feature>.api.ts`)

- Export **`XxxApi`** as **`BrodoraApiHandler`** instances; add **`Xxx: XxxApi`** (or nest under **`BrodoraApi`**) in **`shared/api/index.ts`**.
- **`key`**: **`"<domain>:<action>"`** (e.g. **`users:list`**).
- **`z.void()`** for no payload; preload **`validateOutput`** uses Zod (enable **`zod-jitless`** in preload for Electron).

## Checklist — new feature module

1. Create **`shared/api/<feature>.api.ts`** with **`BrodoraApiHandler`** entries; export and wire into **`BrodoraApi`** in **`shared/api/index.ts`**.
2. Create **`modules/<feature>/<feature>.service.ts`**: **`handleBrodoraApi`** in **`onModuleInit`**, use **`@InjectRepository`** / **`@InjectDataSource()`** as needed.
3. Create **`modules/<feature>/<feature>.module.ts`** with **`TypeOrmModule.forFeature`** when using entities.
4. Register **`XxxModule`** in **`AppModule.forRoot`** **`imports`**.
5. **Preload**: add **`setupBrodoraApi(BrodoraApi.<feature>)`** under **`CallableBrodoraApi`**.
6. Add **`src/main/migrations/<timestamp>-<Name>.ts`** (digit-prefixed name). It is picked up automatically; no **`DatabaseModule`** edit.
7. Run **`pnpm run typecheck:node`** from **`core/brodora`**.

## Patterns copied from `UsersModule`

- **`users.module.ts`**: **`TypeOrmModule.forFeature([User])`**, **`UsersService`** provider.
- **`users.service.ts`**: **`handleBrodoraApi(BrodoraApi.users.xxx, async (input) => ...)`**.
- **`shared/api/users.api.ts`**: **`BrodoraApiHandler`** definitions.

**`database.module.ts`** (reference)

- **`forRoot(userDataDir)`** wires **TypeORM** once; feature modules add **`TypeOrmModule.forFeature([...])`**.

## Do not

- Start **`@nestjs/platform-express`** or any HTTP listener in this app unless explicitly requested.
- **`import { ipcMain }`** inside shared code consumed by preload — keep **`handleBrodoraApi`** **main-only**; preload uses **`setupBrodoraApi`** + **`ipcRenderer.invoke`** internally.
- Register the same **`ipcMain.handle` channel** twice without **`removeHandler`** (watch HMR / hot reload during dev).
- Skip preload + **`index.d.ts`** updates when adding new IPC channels — renderer typings will lie.

## Verification

- **`pnpm run typecheck:node`** in **`core/brodora`**
- **`pnpm exec biome check src/main/`** from **`core/brodora`** (package **`biome.json`** enables Nest parameter decorators)
