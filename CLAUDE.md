# MindStudio Custom Script — Script Scaffold

## What This Is

This is a TypeScript project for building custom scripts (backend logic) for MindStudio AI workflows. Scripts are single-file serverless functions that export a `handler` function and always return an object. Think of them as lambdas — what happens inside is up to you.

## The One Rule

**You can only edit `src/index.ts`.** Everything else (dev tooling, sync infrastructure) is pre-configured and must not be modified.

## The Handler Function

Your script must export a named `handler` function. It receives input parameters and must return an object:

```typescript
import { MindStudioAgent } from '@mindstudio-ai/agent';

export const handler = async (
  topic: string,
): Promise<{
  result: string;
}> => {
  const agent = new MindStudioAgent();

  const { content } = await agent.generateText({
    message: `Write a haiku about ${topic}.`,
  });

  return { result: content };
};
```

- The function is always `async` and returns a `Promise<{ ... }>`.
- Input parameters are defined by the workflow configuration in MindStudio.
- The return value must always be a plain object. Its shape is up to you.

## The `@mindstudio-ai/agent` Package

The `@mindstudio-ai/agent` package is always in scope. In the remote MindStudio environment it's auto-authenticated. For local development, you'll need a MindStudio API key set as `MINDSTUDIO_API_KEY` in your environment.

```typescript
import { MindStudioAgent } from '@mindstudio-ai/agent';

const agent = new MindStudioAgent();

// Generate text
const { content } = await agent.generateText({
  message: 'Your prompt here',
});
```

## Local Dev

To develop locally against MindStudio:

```
npm run dev:local -- --key <api-key> --app <appId> --workflow <workflowId> --step <stepId>
```

This fetches the current code from MindStudio, syncs it with your local `src/index.ts`, and watches for changes. Edits are pushed to MindStudio automatically via the API.

## Code Conventions

- Always provide the **complete, fully rewritten** `src/index.ts` — never partial diffs.
- The handler function must always return a plain object.
- Packages can be installed simply by importing them (MindStudio auto-installs missing packages in the remote environment).
- Use the `node:` prefix for Node.js built-in modules (e.g. `import fs from 'node:fs/promises'`).
- Keep it simple — this is a single function, not an application.
