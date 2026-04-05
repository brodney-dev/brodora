/**
 * Zod 4 can compile object schemas with `new Function()` (fast path). Electron preload
 * runs in a context where dynamic code generation is disallowed → EvalError.
 * Must run before any `safeParse` / `parse` on Zod schemas loaded in this bundle.
 */
import { z } from "zod";

z.config({ jitless: true });
