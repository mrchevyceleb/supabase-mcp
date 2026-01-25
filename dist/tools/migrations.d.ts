/**
 * Migration Tools
 *
 * Tools for managing Supabase database migrations.
 */
import { z } from 'zod';
export declare function createMigrationsTools(): {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            dry_run: z.ZodOptional<z.ZodBoolean>;
            include_seed: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            dry_run?: boolean | undefined;
            include_seed?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            dry_run?: boolean | undefined;
            include_seed?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            dry_run?: boolean;
            include_seed?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            project_path?: string | undefined;
        }, {
            name: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            name: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            migration_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            schema: z.ZodOptional<z.ZodString>;
            file: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            file?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            file?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            schema?: string;
            file?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<["applied", "reverted"]>;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            status: "applied" | "reverted";
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            version: string;
            status: "applied" | "reverted";
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            status: "applied" | "reverted";
            version: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            version: string;
            status: "applied" | "reverted";
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            version?: string | undefined;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            version?: string | undefined;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            version?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    };
};
export declare const migrationsTools: {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            dry_run: z.ZodOptional<z.ZodBoolean>;
            include_seed: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            dry_run?: boolean | undefined;
            include_seed?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            dry_run?: boolean | undefined;
            include_seed?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            dry_run?: boolean;
            include_seed?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            project_path?: string | undefined;
        }, {
            name: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            name: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            migration_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            schema: z.ZodOptional<z.ZodString>;
            file: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            file?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            file?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            schema?: string;
            file?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<["applied", "reverted"]>;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            version: string;
            status: "applied" | "reverted";
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            version: string;
            status: "applied" | "reverted";
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            status: "applied" | "reverted";
            version: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            version: string;
            status: "applied" | "reverted";
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            version?: string | undefined;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            version?: string | undefined;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            version?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
        }>;
    };
};
//# sourceMappingURL=migrations.d.ts.map