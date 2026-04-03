---
name: brodora-electron-main-module
description: Adds a new NestJS feature module to the Brodora Electron main process with typed IPC via InternalApiHandler and handleInternalApi. Use when creating main-process modules, ipcMain handlers, renderer-facing APIs, or extending core/brodora after DatabaseModule/MigrationModule patterns.
---

# Brodora Electron main module (Nest + typed IPC)

## Context

- **Package**: `core/brodora` — Electron **main** process only (no HTTP server).
- **DI**: NestJS via **`NestFactory.createApplicationContext()`** in `src/main/index.ts` — modules, `Injectable` services, **`onModuleInit`**, no `listen()`.
- **IPC**: **`ipcMain.handle`** is wrapped by **`handleInternalApi`** so the **channel string**, **input schema**, and **handler** stay aligned. **`InternalApiHandler`** holds `key` + Zod `inputValidator` / `outputValidator`.
- **Shared contract**: Define one **`InternalApiHandler` per procedure** in a **`<feature>.api.ts`** file. Main registers with **`handleInternalApi(api, handler)`**. Preload **`contextBridge`** exposes **`window.callInternalApi`** (from `system/types/api.ts`) and **`window.api.<feature>`** = the exported **`<Feature>Api`** object (same **`InternalApiHandler`** instances). The renderer calls **`window.callInternalApi(window.api.settings.getAll)`** or **`window.callInternalApi(window.api.settings.set, { key, value })`** — no raw **`ipcRenderer.invoke`** in app code.

## Locations (under `core/brodora/src/main/`)

| Artifact | Path |
|----------|------|
| Root Nest module | `modules/app.module.ts` — `AppModule.forRoot()` **`imports`** |
| Global DB (reference) | `modules/database/database.module.ts`, `modules/database/database.tokens.ts` |
| Feature example | `modules/migration/` — `migration.module.ts`, `migration.service.ts`, `migration.api.ts` |
| IPC + handler helpers | `system/types/api.ts` — `InternalApiHandler`, `handleInternalApi`, `callInternalApi` |
| DB init / types | `system/db/` — use **`BRODORA_DATABASE`** token to inject DB in services |
| Preload surface | `src/preload/index.ts` + `src/preload/index.d.ts` — **`window.callInternalApi`**, **`window.api`** re-exports each **`<Feature>Api`** (see **`SettingsModule`**) |
| Tooling | `tsconfig.node.json` — `experimentalDecorators`, `emitDecoratorMetadata`; `core/brodora/biome.json` — `unsafeParameterDecoratorsEnabled` for `@Inject` |

## Module types

### 1. Global infrastructure module (like `DatabaseModule`)

- **`@Global()`** + **`static forRoot(...): DynamicModule`**.
- Registers providers that many features need (e.g. **`BRODORA_DATABASE`** from **`database.tokens.ts`**).
- **`global: true`** inside the dynamic module return; **`exports`** the token(s).
- **`AppModule.forRoot(userDataDir)`** already **`imports`** **`DatabaseModule.forRoot(userDataDir)`** — new global modules are rare; prefer feature modules + inject shared tokens.

### 2. Feature module (like `MigrationModule`)

- **`@Module({ providers: [XxxService] })`** — no HTTP controllers.
- **`XxxService`**: `@Injectable()`, **`implements OnModuleInit`** if it registers IPC.
- Inject DB with **`@Inject(BRODORA_DATABASE) private readonly brodoraDatabase: BrodoraDatabase`** (symbol token requires **`@Inject`**; **`BrodoraDatabase`** is a type alias only).
- Register handlers in **`onModuleInit()`** using **`handleInternalApi(XxxApi.someMethod, (input) => ...)`**.

### 3. API contract file (`<feature>.api.ts`)

- Export a **const object** of **`InternalApiHandler`** instances (e.g. **`MigrationApi`**).
- **`key`**: stable string, convention **`"<domain>:<action>"`** (e.g. **`migration:isMigrated`**).
- **`inputValidator` / `outputValidator`**: Zod schemas; use **`z.void()`** for no payload. **`handleInternalApi`** normalizes IPC **`...args`** to a single value (empty → **`undefined`**, one arg → that value) before **`validateInput`**.
- **Single source of truth**: the same **`InternalApiHandler`** reference is used for main registration and (where applicable) **`callInternalApi`** in preload.

## Checklist — new feature module

1. Create **`modules/<feature>/<feature>.api.ts`** with **`InternalApiHandler`** entries (`key`, Zod input/output).
2. Create **`modules/<feature>/<feature>.service.ts`**: `@Injectable()`, inject deps (`@Inject(BRODORA_DATABASE)` when using SQLite), implement domain logic.
3. In **`onModuleInit`**, call **`handleInternalApi`** for each procedure — handler receives **typed `z.infer<InputValidator>`**.
4. Create **`modules/<feature>/<feature>.module.ts`**: **`providers: [XxxService]`**.
5. Add **`import { XxxModule } from "./<feature>/<feature>.module"`** inside **`AppModule.forRoot`**’s **`imports`** array.
6. **Preload**: **`import { XxxApi } from "../main/modules/<feature>/<feature>.api"`** and set **`api.<feature> = XxxApi`** on the object passed to **`exposeInMainWorld("api", …)`**. Ensure **`callInternalApi`** is exposed. Extend **`index.d.ts`** (**`Window.callInternalApi`**, **`api.<feature>`** types).
7. Run **`pnpm run typecheck:node`** from **`core/brodora`**.

## Patterns copied from `MigrationModule`

**`migration.module.ts`**

```ts
@Module({
	providers: [MigrationService],
})
export class MigrationModule {}
```

**`migration.service.ts`** (IPC registration + DB)

- Constructor: **`@Inject(BRODORA_DATABASE) private readonly brodoraDatabase: BrodoraDatabase`**
- **`onModuleInit()`**: **`handleInternalApi(MigrationApi.xxx, (input) => this.method(input))`**

**`migration.api.ts`**

- **`new InternalApiHandler({ key, inputValidator, outputValidator })`** per IPC endpoint.

**`database.module.ts`** (reference)

- **`forRoot(userDataDir)`** provides **`BRODORA_DATABASE`**; feature services do not re-init the DB.

## Do not

- Start **`@nestjs/platform-express`** or any HTTP listener in this app unless explicitly requested.
- **`import { ipcMain }`** inside shared packages used by preload/renderer — keep **`handleInternalApi`** usage **main-only**; preload uses **`ipcRenderer`** / **`callInternalApi`** only.
- Register the same **`ipcMain.handle` channel** twice without **`removeHandler`** (watch HMR / hot reload during dev).
- Skip preload + **`index.d.ts`** updates when adding new IPC channels — renderer typings will lie.

## Verification

- **`pnpm run typecheck:node`** in **`core/brodora`**
- **`pnpm exec biome check src/main/`** from **`core/brodora`** (package **`biome.json`** enables Nest parameter decorators)
