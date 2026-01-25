#!/usr/bin/env node
/**
 * @mattjohnston/supabase-mcp
 *
 * MCP server for Supabase CLI operations with cloud-stored credentials.
 *
 * This server fetches credentials from the assistant-mcp server (Railway)
 * and uses them to execute Supabase CLI commands locally.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
// Import tools
import { migrationsTools } from './tools/migrations.js';
import { functionsTools } from './tools/functions.js';
import { typesTools } from './tools/types.js';
import { databaseTools } from './tools/database.js';
// Combine all tools
const allTools = {
    ...migrationsTools,
    ...functionsTools,
    ...typesTools,
    ...databaseTools,
};
// Validate environment
function validateEnvironment() {
    const required = ['SUPABASE_ACCOUNT', 'MCP_AUTH_TOKEN', 'ASSISTANT_MCP_URL'];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        console.error(`[supabase-mcp] Missing required environment variables: ${missing.join(', ')}`);
        console.error('[supabase-mcp] Required environment variables:');
        console.error('  - SUPABASE_ACCOUNT: Account identifier (e.g., "eliteteam" or "personal")');
        console.error('  - MCP_AUTH_TOKEN: Bearer token for assistant-mcp authentication');
        console.error('  - ASSISTANT_MCP_URL: URL of the assistant-mcp server');
        process.exit(1);
    }
    const account = process.env.SUPABASE_ACCOUNT;
    console.error(`[supabase-mcp] Starting MCP server for account: ${account}`);
    console.error(`[supabase-mcp] Credentials will be fetched from: ${process.env.ASSISTANT_MCP_URL}`);
}
// Create MCP server
const server = new Server({
    name: `supabase-mcp-${process.env.SUPABASE_ACCOUNT || 'unknown'}`,
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = Object.entries(allTools).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.inputSchema, { target: 'jsonSchema7' }),
    }));
    console.error(`[supabase-mcp] Listing ${tools.length} tools`);
    return { tools };
});
// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const startTime = Date.now();
    console.error(`[supabase-mcp] Calling tool: ${name}`);
    try {
        const tool = allTools[name];
        if (!tool) {
            throw new Error(`Unknown tool: ${name}`);
        }
        // Validate input with Zod
        const validatedArgs = tool.inputSchema.parse(args);
        // Execute tool
        const result = await tool.handler(validatedArgs);
        const executionTime = Date.now() - startTime;
        console.error(`[supabase-mcp] Tool ${name} completed in ${executionTime}ms`);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    catch (error) {
        const executionTime = Date.now() - startTime;
        console.error(`[supabase-mcp] Tool ${name} failed after ${executionTime}ms: ${error.message}`);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        error: error.message,
                        tool: name,
                    }, null, 2),
                },
            ],
            isError: true,
        };
    }
});
// Main entry point
async function main() {
    try {
        // Validate environment
        validateEnvironment();
        // Log available tools
        const toolNames = Object.keys(allTools);
        console.error(`[supabase-mcp] Registered ${toolNames.length} tools:`);
        toolNames.forEach((name) => console.error(`  - ${name}`));
        // Start stdio transport
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error('[supabase-mcp] MCP server started on stdio');
    }
    catch (error) {
        console.error('[supabase-mcp] Fatal error:', error.message);
        process.exit(1);
    }
}
// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.error('[supabase-mcp] Received SIGTERM, shutting down...');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.error('[supabase-mcp] Received SIGINT, shutting down...');
    process.exit(0);
});
// Handle unhandled errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('[supabase-mcp] Unhandled rejection:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('[supabase-mcp] Uncaught exception:', error);
    process.exit(1);
});
// Run
main();
//# sourceMappingURL=index.js.map