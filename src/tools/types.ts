/**
 * Types Tools
 *
 * Tools for generating TypeScript types from Supabase schema.
 */

import { z } from 'zod';
import { runSupabaseCommand } from '../cli-executor.js';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

// Get account name at runtime
function getAccount(): string {
  return process.env.SUPABASE_ACCOUNT || 'default';
}

export function createTypesTools() {
  const account = getAccount();
  const prefix = account;

  return {
    /**
     * Generate TypeScript types from database schema
     */
    [`${prefix}_gen_types`]: {
      description: `Generate TypeScript types from Supabase database schema (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        output_path: z
          .string()
          .optional()
          .describe('Output file path for generated types (e.g., src/types/database.ts)'),
        schema: z
          .string()
          .optional()
          .describe('Schema to generate types for (default: public)'),
      }),
      handler: async (args: {
        project_path?: string;
        project_ref?: string;
        output_path?: string;
        schema?: string;
      }) => {
        const cmdArgs = ['gen', 'types', 'typescript', '--local'];

        if (args.project_ref) {
          cmdArgs.push('--project-id', args.project_ref);
          // Remove --local when using project-id (fetch from remote)
          const localIndex = cmdArgs.indexOf('--local');
          if (localIndex > -1) {
            cmdArgs.splice(localIndex, 1);
          }
        }

        if (args.schema) {
          cmdArgs.push('--schema', args.schema);
        }

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        // If output path is specified and command succeeded, write the types
        if (args.output_path && result.success && result.stdout) {
          try {
            const outputDir = dirname(args.output_path);
            await mkdir(outputDir, { recursive: true });
            await writeFile(args.output_path, result.stdout, 'utf-8');
            return {
              account: getAccount(),
              operation: 'gen_types',
              output_file: args.output_path,
              types_written: true,
              ...result,
            };
          } catch (writeError: any) {
            return {
              account: getAccount(),
              operation: 'gen_types',
              output_file: args.output_path,
              types_written: false,
              write_error: writeError.message,
              ...result,
            };
          }
        }

        return {
          account: getAccount(),
          operation: 'gen_types',
          ...result,
        };
      },
    },

    /**
     * Generate types from OpenAPI spec (for Edge Functions)
     */
    [`${prefix}_gen_types_api`]: {
      description: `Generate TypeScript types from Supabase OpenAPI spec (${account} account)`,
      inputSchema: z.object({
        project_path: z
          .string()
          .optional()
          .describe('Path to the project directory (defaults to current directory)'),
        project_ref: z
          .string()
          .optional()
          .describe('Supabase project reference ID (uses linked project if not specified)'),
        output_path: z
          .string()
          .optional()
          .describe('Output file path for generated types'),
      }),
      handler: async (args: { project_path?: string; project_ref?: string; output_path?: string }) => {
        const cmdArgs = ['gen', 'types', 'typescript', '--project-id'];

        if (!args.project_ref) {
          return {
            account: getAccount(),
            operation: 'gen_types_api',
            success: false,
            error: 'project_ref is required for API type generation',
          };
        }

        cmdArgs.push(args.project_ref);

        const result = await runSupabaseCommand(cmdArgs, args.project_path);

        // Write to file if specified
        if (args.output_path && result.success && result.stdout) {
          try {
            const outputDir = dirname(args.output_path);
            await mkdir(outputDir, { recursive: true });
            await writeFile(args.output_path, result.stdout, 'utf-8');
            return {
              account: getAccount(),
              operation: 'gen_types_api',
              output_file: args.output_path,
              types_written: true,
              ...result,
            };
          } catch (writeError: any) {
            return {
              account: getAccount(),
              operation: 'gen_types_api',
              output_file: args.output_path,
              types_written: false,
              write_error: writeError.message,
              ...result,
            };
          }
        }

        return {
          account: getAccount(),
          operation: 'gen_types_api',
          ...result,
        };
      },
    },
  };
}

export const typesTools = createTypesTools();
