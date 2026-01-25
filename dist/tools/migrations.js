/**
 * Migration Tools
 *
 * Tools for managing Supabase database migrations.
 */
import { z } from 'zod';
import { runSupabaseCommand } from '../cli-executor.js';
// Get account name at runtime
function getAccount() {
    return process.env.SUPABASE_ACCOUNT || 'default';
}
// Tool factory - creates tools with the correct prefix
export function createMigrationsTools() {
    const account = getAccount();
    const prefix = account;
    return {
        /**
         * Push migrations to remote database
         */
        [`${prefix}_db_push`]: {
            description: `Push pending migrations to the remote Supabase database (${account} account)`,
            inputSchema: z.object({
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
                dry_run: z
                    .boolean()
                    .optional()
                    .describe('Preview the migration without applying it'),
                include_seed: z
                    .boolean()
                    .optional()
                    .describe('Include seed.sql after migration'),
            }),
            handler: async (args) => {
                const cmdArgs = ['db', 'push'];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                if (args.dry_run) {
                    cmdArgs.push('--dry-run');
                }
                if (args.include_seed) {
                    cmdArgs.push('--include-seed');
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'db_push',
                    ...result,
                };
            },
        },
        /**
         * Create a new migration file
         */
        [`${prefix}_migrations_new`]: {
            description: `Create a new migration file (${account} account)`,
            inputSchema: z.object({
                name: z.string().describe('Name for the migration (will be prefixed with timestamp)'),
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
            }),
            handler: async (args) => {
                const cmdArgs = ['migration', 'new', args.name];
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'migrations_new',
                    migration_name: args.name,
                    ...result,
                };
            },
        },
        /**
         * List all migrations and their status
         */
        [`${prefix}_migrations_list`]: {
            description: `List all migrations and their status (${account} account)`,
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
                const cmdArgs = ['migration', 'list'];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'migrations_list',
                    ...result,
                };
            },
        },
        /**
         * Generate a diff between local and remote schema
         */
        [`${prefix}_db_diff`]: {
            description: `Generate a schema diff between local and remote database (${account} account)`,
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
                    .describe('Schema to diff (default: public)'),
                file: z
                    .string()
                    .optional()
                    .describe('Output file path for the diff'),
            }),
            handler: async (args) => {
                const cmdArgs = ['db', 'diff'];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                if (args.schema) {
                    cmdArgs.push('--schema', args.schema);
                }
                if (args.file) {
                    cmdArgs.push('--file', args.file);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'db_diff',
                    ...result,
                };
            },
        },
        /**
         * Repair migration history
         */
        [`${prefix}_migrations_repair`]: {
            description: `Repair migration history by marking migrations as applied (${account} account)`,
            inputSchema: z.object({
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
                status: z
                    .enum(['applied', 'reverted'])
                    .describe('Status to set for the migration'),
                version: z
                    .string()
                    .describe('Migration version (timestamp) to repair'),
            }),
            handler: async (args) => {
                const cmdArgs = ['migration', 'repair', '--status', args.status, args.version];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'migrations_repair',
                    version: args.version,
                    status: args.status,
                    ...result,
                };
            },
        },
        /**
         * Squash migrations
         */
        [`${prefix}_migrations_squash`]: {
            description: `Squash multiple migrations into a single migration (${account} account)`,
            inputSchema: z.object({
                project_path: z
                    .string()
                    .optional()
                    .describe('Path to the project directory (defaults to current directory)'),
                project_ref: z
                    .string()
                    .optional()
                    .describe('Supabase project reference ID (uses linked project if not specified)'),
                version: z
                    .string()
                    .optional()
                    .describe('Target migration version to squash up to'),
            }),
            handler: async (args) => {
                const cmdArgs = ['migration', 'squash'];
                if (args.project_ref) {
                    cmdArgs.push('--project-ref', args.project_ref);
                }
                if (args.version) {
                    cmdArgs.push('--version', args.version);
                }
                const result = await runSupabaseCommand(cmdArgs, args.project_path);
                return {
                    account: getAccount(),
                    operation: 'migrations_squash',
                    ...result,
                };
            },
        },
    };
}
// Export created tools
export const migrationsTools = createMigrationsTools();
//# sourceMappingURL=migrations.js.map