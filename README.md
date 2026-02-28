# MindStudio Script Scaffold

A TypeScript project for building custom scripts in MindStudio. Scripts are single-file serverless functions that run as backend logic in MindStudio workflows.

The only file you edit is **`src/index.ts`**. Everything else is pre-configured.

## Local Development with Claude Code

The fastest way to build a custom script is to clone this repo locally and use Claude Code to edit `src/index.ts`, with changes syncing live to MindStudio.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed globally (`npm install -g @anthropic-ai/claude-code`)
- A MindStudio API key
- The app, workflow, and step IDs for the script you're editing (shown in MindStudio when you enable local editing)

### Step-by-step setup

**1. Clone the repo and install dependencies:**

```bash
git clone <this-repo-url> my-script
cd my-script
npm install
```

**2. Start local dev mode:**

```bash
npm run dev:local -- --key <api-key> --app <appId> --workflow <workflowId> --step <stepId>
```

You can also set `MINDSTUDIO_API_KEY` as an environment variable instead of passing `--key`.

This fetches the current code from MindStudio, writes it to `src/index.ts` (if your local file is empty), and starts watching for changes. You'll see:

```
  ⚡ MindStudio Script Dev

  ➜  Editing:   src/index.ts
  ➜  Synced:    remote → local

  Changes push to MindStudio automatically.
  Press Ctrl+C to stop.
```

**3. Open Claude Code in the project:**

```bash
claude
```

Claude Code will read the `CLAUDE.md` file and automatically understand the project structure, the handler pattern, and the constraint that only `src/index.ts` should be edited. Just tell it what script you want to build.

### How local dev mode works

- **First run** pulls the remote code to `src/index.ts` so you have a starting point.
- **After that, your local file is the source of truth.** Any changes you (or Claude Code) make to `src/index.ts` are automatically pushed to MindStudio via the API.
- The file watcher uses a 200ms stability threshold, so rapid saves (common with Claude Code) are batched into a single sync.

### Tips

- **Only edit `src/index.ts`.** Everything else is pre-configured. Claude Code already knows this from `CLAUDE.md`.
- The `--step` parameter identifies which script step in your workflow to sync. For script-type workflows, MindStudio will show you the correct step ID.
