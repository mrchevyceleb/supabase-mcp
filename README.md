# @mattjohnston/supabase-mcp

MCP server for Supabase CLI operations with cloud-stored credentials.

## Overview

This MCP server enables Supabase CLI operations from any directory on any machine without manual login/logout. Credentials are securely stored in a central cloud server (assistant-mcp) and fetched at runtime.

## Features

- **No manual login required** - Credentials fetched automatically
- **Multi-account support** - Configure separate instances for different Supabase accounts
- **Works globally** - Use from any project directory
- **Cross-platform** - Windows, macOS, Linux

## Configuration

Add to your `~/.claude.json`:

```json
{
  "globalMcpServers": {
    "supabase-elite": {
      "command": "npx",
      "args": ["-y", "@mattjohnston/supabase-mcp"],
      "env": {
        "SUPABASE_ACCOUNT": "eliteteam",
        "MCP_AUTH_TOKEN": "your-auth-token",
        "ASSISTANT_MCP_URL": "https://assistant-mcp-production.up.railway.app"
      }
    },
    "supabase-personal": {
      "command": "npx",
      "args": ["-y", "@mattjohnston/supabase-mcp"],
      "env": {
        "SUPABASE_ACCOUNT": "personal",
        "MCP_AUTH_TOKEN": "your-auth-token",
        "ASSISTANT_MCP_URL": "https://assistant-mcp-production.up.railway.app"
      }
    }
  }
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_ACCOUNT` | Account identifier (used to fetch credentials) |
| `MCP_AUTH_TOKEN` | Bearer token for assistant-mcp authentication |
| `ASSISTANT_MCP_URL` | URL of the assistant-mcp server |

## Available Tools

### Migrations
- `db_push` - Push migrations to remote database
- `migrations_new` - Create a new migration file
- `migrations_list` - List migration status
- `db_diff` - Generate schema diff

### Edge Functions
- `functions_deploy` - Deploy edge functions
- `functions_list` - List deployed functions

### Type Generation
- `gen_types` - Generate TypeScript types from schema

### Project Management
- `projects_list` - List all projects in account
- `link_project` - Link current directory to a project
- `status` - Show project status

## Security

- Credentials are encrypted at rest (AES-256-GCM)
- Fetched over HTTPS with bearer token authentication
- Never stored locally on disk
- Access is logged for audit purposes

## Prerequisites

- Node.js 18+
- Supabase CLI installed (`npm install -g supabase`)
- Credentials stored in assistant-mcp server

## License

MIT
