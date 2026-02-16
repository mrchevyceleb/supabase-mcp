# @mattjohnston/supabase-mcp

MCP server for Supabase CLI operations with cloud-stored credentials.

## Overview

This MCP server enables Supabase CLI operations from any directory on any machine without manual login/logout. Credentials are securely stored in a central cloud server (assistant-mcp) and fetched at runtime.

## Features

- **No manual login required** - Credentials fetched automatically from assistant-mcp
- **Multi-account support** - Configure separate instances for different Supabase accounts
- **Works globally** - Use from any project directory on any drive
- **Cross-platform** - Windows, macOS, Linux
- **Cross-machine** - Works identically on all computers with the same config

## Installation

### Option 1: Using npx (Recommended)

No installation needed - npx will download and run the package automatically:

```bash
npx github:mrchevyceleb/supabase-mcp
```

### Option 2: Clone and Link (Development)

```bash
git clone https://github.com/mrchevyceleb/supabase-mcp.git
cd supabase-mcp
npm install
npm run build
npm link
```

## Configuration

Add to your `~/.claude.json` under `globalMcpServers`:

```json
{
  "globalMcpServers": {
    "supabase-elite": {
      "command": "npx",
      "args": ["-y", "github:mrchevyceleb/supabase-mcp"],
      "env": {
        "SUPABASE_ACCOUNT": "eliteteam",
        "MCP_AUTH_TOKEN": "your-mcp-auth-token",
        "ASSISTANT_MCP_URL": "https://assistant-mcp-production.up.railway.app"
      }
    },
    "supabase-personal": {
      "command": "npx",
      "args": ["-y", "github:mrchevyceleb/supabase-mcp"],
      "env": {
        "SUPABASE_ACCOUNT": "personal",
        "MCP_AUTH_TOKEN": "your-mcp-auth-token",
        "ASSISTANT_MCP_URL": "https://assistant-mcp-production.up.railway.app"
      }
    }
  }
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_ACCOUNT` | Account identifier (used to fetch credentials from assistant-mcp as `supabase_{account}`) |
| `MCP_AUTH_TOKEN` | Bearer token for assistant-mcp authentication (same as your assistant-mcp admin token) |
| `ASSISTANT_MCP_URL` | URL of the assistant-mcp server |

## Storing Credentials

Before using this MCP, you must store your Supabase access tokens in assistant-mcp.

### Generate Supabase Access Token

1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate New Token"
3. Give it a name (e.g., "Claude Code - EliteTeam")
4. Copy the token (you won't see it again!)

### Store in assistant-mcp

Use the admin API or curl to store the credential:

```bash
curl -X POST https://assistant-mcp-production.up.railway.app/admin/api/credentials \
  -H "Authorization: Bearer YOUR_MCP_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "service": "supabase_eliteteam",
    "apiKey": "sbp_your_supabase_access_token",
    "metadata": {
      "project_refs": ["project-ref-1", "project-ref-2"],
      "default_project": "project-ref-1"
    }
  }'
```

Repeat for each account (e.g., `supabase_personal`).

## Available Tools

All tools are prefixed with the account name (e.g., `eliteteam_db_push`).

### Migrations
| Tool | Description |
|------|-------------|
| `{account}_db_push` | Push migrations to remote database |
| `{account}_migrations_new` | Create a new migration file |
| `{account}_migrations_list` | List migration status |
| `{account}_db_diff` | Generate schema diff |
| `{account}_migrations_repair` | Repair migration history |
| `{account}_migrations_squash` | Squash migrations |

### Database
| Tool | Description |
|------|-------------|
| `{account}_db_execute_sql` | Execute raw SQL against the remote database (uses Supabase Management API) |

### Edge Functions
| Tool | Description |
|------|-------------|
| `{account}_functions_deploy` | Deploy edge functions |
| `{account}_functions_list` | List deployed functions |
| `{account}_functions_delete` | Delete a function |
| `{account}_functions_new` | Create a new function |
| `{account}_functions_serve` | Serve functions locally |

### Type Generation
| Tool | Description |
|------|-------------|
| `{account}_gen_types` | Generate TypeScript types from schema |
| `{account}_gen_types_api` | Generate types from OpenAPI spec |

### Project Management
| Tool | Description |
|------|-------------|
| `{account}_projects_list` | List all projects in account |
| `{account}_link_project` | Link directory to a project |
| `{account}_status` | Show project status |
| `{account}_init` | Initialize new Supabase project |
| `{account}_start` | Start local Supabase stack |
| `{account}_stop` | Stop local Supabase stack |
| `{account}_db_reset` | Reset local database |
| `{account}_db_pull` | Pull remote schema |
| `{account}_db_dump` | Dump database schema |
| `{account}_db_lint` | Lint SQL files |
| `{account}_health` | Check CLI and credentials status |
| `{account}_refresh_credentials` | Force refresh credentials |

## Usage Examples

```
# List all EliteTeam projects (from any directory)
mcp__supabase-elite__eliteteam_projects_list()

# Push migrations from a specific project
mcp__supabase-elite__eliteteam_db_push({ project_path: "K:/EliteTeam/profit-wizard" })

# Generate types for personal account
mcp__supabase-personal__personal_gen_types({
  project_path: "E:/Personal/my-saas",
  output_path: "src/types/database.ts"
})

# Check health status
mcp__supabase-elite__eliteteam_health()
```

## Security

- Credentials are encrypted at rest in assistant-mcp (AES-256-GCM)
- Fetched over HTTPS with bearer token authentication
- Never stored locally on disk
- Cached in memory only (5-minute TTL)
- All credential accesses are logged for audit

## Prerequisites

- Node.js 18+
- Supabase CLI installed (`npm install -g supabase`)
- assistant-mcp running (Railway)
- Credentials stored in assistant-mcp

## Multi-Computer Setup

Each computer needs:

1. `~/.claude.json` with globalMcpServers config (copy the exact same config)
2. Supabase CLI installed (`npm install -g supabase`)
3. Network access to assistant-mcp URL

**That's it!** No per-machine credential setup, no Supabase login required.

## Updating on Other Computers

When the MCP server code is updated (e.g. bug fixes), each computer caches the old version via `npx`. To force an update:

### Step 1: Clear the npx cache

**Windows (Git Bash / PowerShell):**
```bash
# Find which npx cache dir has supabase-mcp
for dir in ~/AppData/Local/npm-cache/_npx/*/; do
  if grep -ql "supabase-mcp" "$dir/node_modules/.package-lock.json" 2>/dev/null; then
    echo "Found: $dir"
    rm -rf "$dir"
    echo "Deleted!"
  fi
done
```

**macOS / Linux:**
```bash
# Find which npx cache dir has supabase-mcp
for dir in ~/.npm/_npx/*/; do
  if grep -ql "supabase-mcp" "$dir/node_modules/.package-lock.json" 2>/dev/null; then
    echo "Found: $dir"
    rm -rf "$dir"
    echo "Deleted!"
  fi
done
```

**Nuclear option (clears ALL npx caches):**
```bash
npm cache clean --force
```

### Step 2: Restart Claude Code

Close and reopen Claude Code. The MCP server will re-download the latest version from GitHub on its next start.

### Step 3: Verify

Use the health check tool to confirm the MCP is working:
```
mcp__supabase-personal__personal_health()
```

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   Claude Code       │     │   supabase-mcp        │     │  assistant-mcp  │
│   (MCP client)      │────▶│   (this package)      │────▶│  (Railway)      │
│                     │     │                       │     │                 │
│  Calls tools like   │     │  1. Fetches access    │     │  Stores Supa-   │
│  personal_db_push   │     │     token from cloud  │     │  base tokens    │
│  eliteteam_gen_types│     │  2. Runs supabase CLI │     │  encrypted      │
│  personal_db_execute│     │     with that token   │     │  (AES-256-GCM)  │
└─────────────────────┘     │  3. Returns results   │     └─────────────────┘
                            └──────────┬────────────┘
                                       │
                            ┌──────────▼────────────┐
                            │   Supabase CLI         │
                            │   (installed locally)  │
                            │                        │
                            │   Most tools use CLI:  │
                            │   - functions deploy   │
                            │   - db push            │
                            │   - migration list     │
                            │                        │
                            │   db_execute_sql uses  │
                            │   Management API       │
                            │   directly (no CLI)    │
                            └────────────────────────┘
```

### How `db_execute_sql` works

Unlike other tools that shell out to the Supabase CLI, `db_execute_sql` calls the **Supabase Management API** directly:

```
POST https://api.supabase.com/v1/projects/{project_ref}/database/query
Authorization: Bearer {supabase_access_token}
Content-Type: application/json

{"query": "SELECT * FROM auth.users LIMIT 5"}
```

This is because the Supabase CLI does **not** have a `db execute` command. The Management API endpoint returns JSON results directly.

**Project ref resolution:** If you don't pass `project_ref`, the tool reads it from `{project_path}/supabase/.temp/project-ref` (created when you run `supabase link`).

## Troubleshooting

### "Credential not found"
- Ensure credential is stored in assistant-mcp as `supabase_{account}`
- Check the account name matches your config

### "401 Unauthorized"
- Verify MCP_AUTH_TOKEN matches your assistant-mcp token
- Check ASSISTANT_MCP_URL is correct

### "supabase: command not found"
- Install Supabase CLI: `npm install -g supabase`

### Tools not appearing
- Restart Claude Code after adding config
- Check `~/.claude.json` syntax is valid JSON

### `db_execute_sql` returns "unknown flag: --sql"
- **You are running an old cached version.** Follow the "Updating on Other Computers" steps above to clear the npx cache and restart Claude Code.
- The old version tried to use `supabase db execute --sql` which doesn't exist in the Supabase CLI. The fix (Feb 2026) switched to the Supabase Management API.

### `db_execute_sql` returns "No project_ref provided"
- Either pass `project_ref` explicitly, or make sure the project directory has a linked project (`supabase link --project-ref YOUR_REF`)

### `db_execute_sql` returns "spawn cmd.exe ENOENT"
- Same as the `--sql` error above — old cached version. Clear npx cache and restart.

### Other tools work but `db_execute_sql` doesn't
- Other tools use the Supabase CLI (which works fine). `db_execute_sql` uses the Management API, which needs a valid access token. Run `{account}_health` to check credentials.

## License

MIT
