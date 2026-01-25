/**
 * Database & Project Tools
 *
 * Tools for managing Supabase projects and database operations.
 */

import { z } from 'zod';
import { runSupabaseCommand, checkSupabaseCli } from '../cli-executor.js';
import { getSupabaseCredentials, clearCredentialsCache } from '../credential-client.js';

// Get account name at runtime
function getAccount(): string {
  return process.env.SUPABASE_ACCOUNT || 'default';
}

export function createDatabaseTools() {
  const account = getAccount();
  const prefix = account;

  return {
    /**
     * List all projects in the account
     */
    [`${prefix}_projects_list`]: {
      description: `List all Supabase projects in the ${account} account`,
      inputSchema: z.object({}),
      handler: async () => {
        const result = await runSupabaseCommand(['projects', 'list']);

        return {
          account: getAccount(),
          operation: 'projects_list',
          ...result,
        };
      },
    },

    /**
     * Link current directory to a Supabase project
     */
    [`${prefix}_link_project`]: {
      description: `Link current directory to a Supabase project (${account} account)`,
      inputSchema: z.object({
        project_ref: z.string().describe('Supabase project reference ID'),
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_ref: string; project_path?: string }) => {
        const result = await runSupabaseCommand(
          ['link', '--project-ref', args.project_ref],
          args.project_path
        );

        return {
          account: getAccount(),
          operation: 'link_project',
          project_ref: args.project_ref,
          ...result,
        };
      },
    },

    /**
     * Show project status
     */
    [`${prefix}_status`]: {
      description: `Show the status of the linked Supabase project (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_path?: string }) => {
        const result = await runSupabaseCommand(['status'], args.project_path);

        return {
          account: getAccount(),
          operation: 'status',
          ...result,
        };
      },
    },

    /**
     * Start local Supabase stack
     */
    [`${prefix}_start`]: {
      description: `Start the local Supabase development stack (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_path?: string }) => {
        const result = await runSupabaseCommand(['start'], args.project_path, 10 * 60 * 1000); // 10 min timeout

        return {
          account: getAccount(),
          operation: 'start',
          ...result,
        };
      },
    },

    /**
     * Stop local Supabase stack
     */
    [`${prefix}_stop`]: {
      description: `Stop the local Supabase development stack (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        backup: z
          .boolean()
          .optional()
          .describe('Create a backup before stopping'),
      }),
      handler: async (args: { project_path?: string; backup?: boolean }) => {
        const cmdArgs = ['stop'];
        if (args.backup) {
          cmdArgs.push('--backup');
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'stop',
          ...result,
        };
      },
    },

    /**
     * Reset local database
     */
    [`${prefix}_db_reset`]: {
      description: `Reset the local database to a clean state (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_path?: string }) => {
        const result = await runSupabaseCommand(['db', 'reset'], args.project_path);

        return {
          account: getAccount(),
          operation: 'db_reset',
          ...result,
        };
      },
    },

    /**
     * Pull remote schema
     */
    [`${prefix}_db_pull`]: {
      description: `Pull schema changes from remote database (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        schema: z
          .string()
          .optional()
          .describe('Schema to pull (default: public)'),
      }),
      handler: async (args: { project_path?: string; project_ref?: string; schema?: string }) => {
        const cmdArgs = ['db', 'pull'];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }
        if (args.schema) {
          cmdArgs.push('--schema', args.schema);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'db_pull',
          ...result,
        };
      },
    },

    /**
     * Dump database schema
     */
    [`${prefix}_db_dump`]: {
      description: `Dump the database schema as SQL (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        data_only: z
          .boolean()
          .optional()
          .describe('Dump only data, not schema'),
        schema_only: z
          .boolean()
          .optional()
          .describe('Dump only schema, not data'),
        file: z
          .string()
          .optional()
          .describe('Output file path'),
      }),
      handler: async (args: {
        project_path?: string;
        project_ref?: string;
        data_only?: boolean;
        schema_only?: boolean;
        file?: string;
      }) => {
        const cmdArgs = ['db', 'dump'];

        if (args.project_ref) {
          cmdArgs.push('--project-ref', args.project_ref);
        }
        if (args.data_only) {
          cmdArgs.push('--data-only');
        }
        if (args.schema_only) {
          cmdArgs.push('--schema');
        }
        if (args.file) {
          cmdArgs.push('--file', args.file);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'db_dump',
          ...result,
        };
      },
    },

    /**
     * Lint SQL files
     */
    [`${prefix}_db_lint`]: {
      description: `Lint SQL files for errors (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        level: z
          .enum(['warning', 'error'])
          .optional()
          .describe('Minimum lint level to report'),
      }),
      handler: async (args: { project_path?: string; level?: 'warning' | 'error' }) => {
        const cmdArgs = ['db', 'lint'];

        if (args.level) {
          cmdArgs.push('--level', args.level);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        return {
          account: getAccount(),
          operation: 'db_lint',
          ...result,
        };
      },
    },

    /**
     * Initialize Supabase project
     */
    [`${prefix}_init`]: {
      description: `Initialize a new Supabase project in the current directory (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
      }),
      handler: async (args: { project_path?: string }) => {
        const result = await runSupabaseCommand(['init'], args.project_path);

        return {
          account: getAccount(),
          operation: 'init',
          ...result,
        };
      },
    },

    /**
     * Check CLI and credentials status
     */
    [`${prefix}_health`]: {
      description: `Check Supabase CLI installation and credential status (${account} account)`,
      inputSchema: z.object({}),
      handler: async () => {
        // Check CLI
        const cliStatus = await checkSupabaseCli();

        // Check credentials
        let credentialStatus: {
          available: boolean;
          error?: string;
          project_refs?: string[];
        };

        try {
          const credentials = await getSupabaseCredentials();
          credentialStatus = {
            available: true,
            project_refs: credentials.projectRefs,
          };
        } catch (error: any) {
          credentialStatus = {
            available: false,
            error: error.message,
          };
        }

        return {
          account: getAccount(),
          operation: 'health',
          cli: cliStatus,
          credentials: credentialStatus,
        };
      },
    },

    /**
     * Refresh credentials
     */
    [`${prefix}_refresh_credentials`]: {
      description: `Force refresh credentials from the cloud (${account} account)`,
      inputSchema: z.object({}),
      handler: async () => {
        clearCredentialsCache();

        try {
          const credentials = await getSupabaseCredentials();
          return {
            account: getAccount(),
            operation: 'refresh_credentials',
            success: true,
            project_refs: credentials.projectRefs,
            fetched_at: credentials.fetchedAt.toISOString(),
          };
        } catch (error: any) {
          return {
            account: getAccount(),
            operation: 'refresh_credentials',
            success: false,
            error: error.message,
          };
        }
      },
    },
  };
}

export const databaseTools = createDatabaseTools();
