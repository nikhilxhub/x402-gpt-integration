```markdown
# @nikhilxnpm/agentx402

A pay-per-prompt CLI application that gives on-demand access to premium AI models (Groq, Gemini, GT) without monthly subscriptions. It integrates Solana for wallet and cluster management, and provides a polished terminal UX with ASCII banners, colors, and spinners.

## Installation

```bash
npm install -g @nikhilxnpm/agentx402
```

This globally installs the `agentx402` command. If you see scope-related errors while installing, ensure the package name is correct and published publicly.

## Quick start

```bash
agentx402
```

You’ll see the ASCII banner and an interactive prompt:

```
 █████   ██████  ███████ ███    ██ ████████ ██   ██ ██   ██  ██████  ██████  
██   ██ ██       ██      ████   ██    ██     ██ ██  ██   ██ ██  ████      ██ 
███████ ██   ███ █████   ██ ██  ██    ██      ███   ███████ ██ ██ ██  █████  
██   ██ ██    ██ ██      ██  ██ ██    ██     ██ ██       ██ ████  ██ ██      
██   ██  ██████  ███████ ██   ████    ██    ██   ██      ██  ██████  ███████ 

AI-powered coding assistant with MCP tool support
Type your questions or '/exit' to quit

ℹ︎ Model: groq | Cluster: devnet
ℹ︎ Wallet: <your-public-key>

        Commands:
            :help               show this help
            :change_model       choose a different model
            :change_cluster     choose solana cluster
            :pub_key            show current wallet public key
            :exit               quit
```

Type your prompt directly, or use a command prefixed with `:`.

## CLI commands

- **`:help`**: Show available commands and hints.
- **`:change_model`**: Switch among supported models (Groq, Gemini, GT).
- **`:change_cluster`**: Select Solana cluster (devnet, testnet, mainnet).
- **`:pub_key`**: Display current wallet public key.
- **`:exit`**: Quit the CLI.

## What gets installed

- **Global command**: `agentx402` (declared in `package.json` under `bin`).
- **Runtime entry**: `dist/index.js` (compiled from TypeScript).
- **Compiled files only** (recommended; see Packaging section for keeping the tarball clean).

## Configuration

- **Environment variables**: Place a `.env` file next to the CLI or set env vars in your shell. Common variables may include backend endpoints and model choices.
- **Model selection**: Use `:change_model` to switch between providers dynamically.
- **Solana cluster**: Use `:change_cluster` to toggle networks; devnet is the default for testing.

## Development (monorepo-friendly)

```bash
# From the repository root:
git clone https://github.com/nikhilxhub/x402-gpt
cd apps/cli

# Install dependencies
pnpm install

# Build TypeScript to dist/
pnpm run build

# Run the CLI locally
pnpm run start

# Dev loop (build + run)
pnpm run dev
```

### Project structure

```
apps/cli
 ├── src/              # TypeScript source
 ├── dist/             # Compiled JavaScript
 ├── package.json      # CLI package config
 └── tsconfig.json     # TypeScript build config
```

## Publishing (only CLI from a monorepo)

- Navigate to the CLI package folder (e.g., `apps/cli`) before running any publish command.
- Ensure your `package.json` declares:
  - **`main`:** `dist/index.js`
  - **`bin`:** `{ "agentx402": "dist/index.js" }`
- Build before publishing:
  ```bash
  pnpm run build
  ```
- If using a scope (e.g., `@nikhilxnpm/agentx402`), publish publicly:
  ```bash
  npm publish --access public
  ```
- If you don’t own the scope yet or prefer simplicity, use an **unscoped name**:
  ```json
  { "name": "agentx402", ... }
  ```
  and:
  ```bash
  npm publish
  ```

## Packaging and cleanliness

Keep your npm tarball minimal and professional:

- **Preferred: `files` field in `package.json`**
  ```json
  {
    "files": ["dist", "README.md", "LICENSE"]
  }
  ```
- **Or use `.npmignore`** to exclude dev artifacts:
  ```
  src/
  .env
  .turbo/
  *.log
  tsconfig.json
  tsconfig.tsbuildinfo
  ```
- Avoid shipping `.env`, logs, and raw TypeScript sources unless you intend to.

## How it works (high level)

- **CLI runtime**: Starts from `dist/index.js`, presents an interactive prompt, renders an ASCII banner, and handles commands.
- **Model routing**: Uses provider APIs (Groq, Gemini, GT) to process prompts on demand, aligning cost with usage.
- **Solana integration**: Manages wallet details and cluster selection via `@solana/web3.js`, enabling on-chain verification flows for pay-per-prompt logic.
- **UX polish**: Leverages `chalk`, `boxen`, `ora`, and `figlet` for a readable, expressive terminal experience.

## License

ISC © [nikhilx](https://github.com/nikhilxhub)
```