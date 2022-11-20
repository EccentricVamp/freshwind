# Freshwind

A [Fresh](https://fresh.deno.dev/) plugin for working with [Twind v1](https://github.com/tw-in-js/twind/)

Based on the [existing plugin](https://github.com/denoland/fresh/tree/1b3c9f2569c5d56a6d37c366cb5940f26b7e131e/plugins)
with tweaks from psimk's [sanban](https://github.com/psimk/sanban/blob/main/plugins/twind.ts)

## Usage

```typescript
// twind.config.ts
import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";

// Twind v1 configuration
// Learn more at https://twind.style/installation
export default defineConfig({
  presets: [presetTailwind()],
});

// Make sure you export your config's URL
// so that it can referenced in islands
export const configURL = import.meta.url;
```

```typescript
// main.ts
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import freshwind from "freshwind/plugin.ts";
import config, { configURL } from "./twind.config.ts";

await start(manifest, {
  plugins: [freshwind(config, configURL)],
});
```

```tsx
// routes/index.tsx
export default function Home() {
  return (
    <p class="text-slate-500 bg-slate-100 my-3">
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
    </p>
  );
}
```