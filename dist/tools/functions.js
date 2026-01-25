/**
 * Functions Tools
 *
 * Tools for managing Supabase Edge Functions.
 */
import { z } from 'zod';
import { runSupabaseCommand } from '../cli-executor.js';
// Get account name at runtime
function getAccount() {
    return process.env.SUPABASE_ACCOUNT || 'default';
}
export function createFunctionsTools() {
    const account = getAccount();
    const prefix = account;
    return {
        /**
         * Deploy edge function(s)
         */
        [`${prefix}_functions_deploy`]: {
            description: `Deploy Edge Function(s) to Supabase (${account} account)`,
            inputSchema: z.object({
                function_name: z
                    .string()
                    .optional()
                    .describe('Name of the function to deploy (deploys all if not specified)'),
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
                no_verify_jwt: z
                    .boolean()
                    .optional()
                    .describe('Allow public access to the function without JWT verification'),
            }),
            handler: async (args) => {
                const cmdArgs = ['functions', 'deploy'];
                if (args.function_name) {
                    cmdArgs.push(args.function_name);
                }
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                if (args.no_verify_jwt) {
                    cmdArgs.push('--no-verify-jwt');
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'functions_deploy',
                    function_name: args.function_name || 'all',
                    ...result,
                };
            },
        },
        /**
         * List deployed functions
         */
        [`${prefix}_functions_list`]: {
            description: `List all Edge Functions deployed to Supabase (${account} account)`,
            inputSchema: z.object({
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
            }),
            handler: async (args) => {
                const cmdArgs = ['functions', 'list'];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'functions_list',
                    ...result,
                };
            },
        },
        /**
         * Delete a function
         */
        [`${prefix}_functions_delete`]: {
            description: `Delete an Edge Function from Supabase (${account} account)`,
            inputSchema: z.object({
                function_name: z.string().describe('Name of the function to delete'),
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
            }),
            handler: async (args) => {
                const cmdArgs = ['functions', 'delete', args.function_name];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'functions_delete',
                    function_name: args.function_name,
                    ...result,
                };
            },
        },
        /**
         * Create a new function
         */
        [`${prefix}_functions_new`]: {
            description: `Create a new Edge Function locally (${account} account)`,
            inputSchema: z.object({
                function_name: z.string().describe('Name for the new function'),
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
            }),
            handler: async (args) => {
                const cmdArgs = ['functions', 'new', args.function_name];
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'functions_new',
                    function_name: args.function_name,
                    ...result,
                };
            },
        },
        /**
         * Serve functions locally
         */
        [`${prefix}_functions_serve`]: {
            description: `Serve Edge Functions locally for development (${account} account). Note: This starts a long-running process.`,
            inputSchema: z.object({
                function_name: z
                    .string()
                    .optional()
                    .describe('Name of specific function to serve (serves all if not specified)'),
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                env_file: z
                    .string()
                    .optional()
                    .describe('Path to .env file for environment variables'),
                no_verify_jwt: z
                    .boolean()
                    .optional()
                    .describe('Allow requests without JWT verification'),
            }),
            handler: async (args) => {
                const cmdArgs = ['functions', 'serve'];
                if (args.function_name) {
                    cmdArgs.push(args.function_name);
                }
                if (args.env_file) {
                    cmdArgs.push('--env-file', args.env_file);
                }
                if (args.no_verify_jwt) {
                    cmdArgs.push('--no-verify-jwt');
                }
                // Note: This is a long-running command, but we'll just start it
                const result = await runSupabaseCommand(cmdArgs, args.project_path, 10000); // 10s timeout
                return {
                    account: getAccount(),
                    operation: 'functions_serve',
                    note: 'This command starts a development server. Use Ctrl+C to stop it.',
                    ...result,
                };
            },
        },
    };
}
export const functionsTools = createFunctionsTools();
//# sourceMappingURL=functions.js.map