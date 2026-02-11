/**
 * Functions Tools
 *
 * Tools for managing Supabase Edge Functions.
 */

import { z } from 'zod';
import { runSupabaseCommand, runSupabaseCommandStreaming } from '../cli-executor.js';

// Get account name at runtime
function getAccount(): string {
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
      handler: async (args: {
        function_name?: string;
        project_path?: string;
        project_ref?: string;
        no_verify_jwt?: boolean;
      }) => {
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
      handler: async (args: { project_path?: string; project_ref?: string }) => {
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
      handler: async (args: {
        function_name: string;
        project_path?: string;
        project_ref?: string;
      }) => {
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
      handler: async (args: { function_name: string; project_path?: string }) => {
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
      handler: async (args: {
        function_name?: string;
        project_path?: string;
        env_file?: string;
        no_verify_jwt?: boolean;
      }) => {
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

    /**
     * Set Edge Function secrets
     */
    [`${prefix}_secrets_set`]: {
      description: `Set one or more secrets for Edge Functions (${account} account). Secrets are available as environment variables in all Edge Functions.`,
      inputSchema: z.object({
        secrets: z
          .record(z.string())
          .describe('Key-value pairs of secrets to set (e.g., {"API_KEY": "abc123", "DB_URL": "postgres://..."})'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: {
        secrets: Record<string, string>;
        project_ref?: string;
        project_path?: string;
      }) => {
        const secretPairs = Object.entries(args.secrets).map(
          ([key, value]) => `${key}=${value}`
        );
        const cmdArgs = ['secrets', 'set', ...secretPairs];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'secrets_set',
          keys_set: Object.keys(args.secrets),
          ...result,
        };
      },
    },

    /**
     * List Edge Function secrets
     */
    [`${prefix}_secrets_list`]: {
      description: `List all secrets for Edge Functions (${account} account). Shows secret names (values are not displayed for security).`,
      inputSchema: z.object({
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_ref?: string; project_path?: string }) => {
        const cmdArgs = ['secrets', 'list'];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'secrets_list',
          ...result,
        };
      },
    },

    /**
     * Unset (delete) Edge Function secrets
     */
    [`${prefix}_secrets_unset`]: {
      description: `Remove one or more secrets from Edge Functions (${account} account)`,
      inputSchema: z.object({
        names: z
          .array(z.string())
          .describe('Names of secrets to remove (e.g., ["API_KEY", "DB_URL"])'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: {
        names: string[];
        project_ref?: string;
        project_path?: string;
      }) => {
        const cmdArgs = ['secrets', 'unset', ...args.names];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'secrets_unset',
          keys_removed: args.names,
          ...result,
        };
      },
    },

    /**
     * View Edge Function logs
     */
    [`${prefix}_functions_logs`]: {
      description: `View logs for an Edge Function (${account} account). Shows recent execution logs, errors, and console output.`,
      inputSchema: z.object({
        function_name: z.string().describe('Name of the Edge Function to get logs for'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: {
        function_name: string;
        project_ref?: string;
        project_path?: string;
      }) => {
        const cmdArgs = ['functions', 'logs', args.function_name];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'functions_logs',
          function_name: args.function_name,
          ...result,
        };
      },
    },
  };
}

export const functionsTools = createFunctionsTools();
