/**
 * Database & Project Tools
 *
 * Tools for managing Supabase projects and database operations.
 */
import { z } from 'zod';
export declare function createDatabaseTools(): {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
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
            project_ref: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_ref: string;
            project_path?: string | undefined;
        }, {
            project_ref: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            project_ref: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            project_ref: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
        }, {
            project_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
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
            backup: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            backup?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            backup?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            backup?: boolean;
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
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            schema?: string;
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
            data_only: z.ZodOptional<z.ZodBoolean>;
            schema_only: z.ZodOptional<z.ZodBoolean>;
            file: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            file?: string | undefined;
            data_only?: boolean | undefined;
            schema_only?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            file?: string | undefined;
            data_only?: boolean | undefined;
            schema_only?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            data_only?: boolean;
            schema_only?: boolean;
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
            level: z.ZodOptional<z.ZodEnum<["warning", "error"]>>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            level?: "error" | "warning" | undefined;
        }, {
            project_path?: string | undefined;
            level?: "error" | "warning" | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            level?: "warning" | "error";
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
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            account: string;
            operation: string;
            cli: {
                installed: boolean;
                version?: string;
                error?: string;
            };
            credentials: {
                available: boolean;
                error?: string;
                project_refs?: string[];
            };
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            sql: z.ZodString;
            project_ref: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sql: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            sql: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            sql: string;
            project_ref?: string;
            project_path?: string;
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
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            account: string;
            operation: string;
            success: boolean;
            project_refs: string[];
            fetched_at: string;
            error?: undefined;
        } | {
            account: string;
            operation: string;
            success: boolean;
            error: any;
            project_refs?: undefined;
            fetched_at?: undefined;
        }>;
    };
};
export declare const databaseTools: {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
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
            project_ref: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_ref: string;
            project_path?: string | undefined;
        }, {
            project_ref: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            project_ref: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            project_ref: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
        }, {
            project_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
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
            backup: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            backup?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            backup?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            backup?: boolean;
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
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            schema?: string;
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
            data_only: z.ZodOptional<z.ZodBoolean>;
            schema_only: z.ZodOptional<z.ZodBoolean>;
            file: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            file?: string | undefined;
            data_only?: boolean | undefined;
            schema_only?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            file?: string | undefined;
            data_only?: boolean | undefined;
            schema_only?: boolean | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            data_only?: boolean;
            schema_only?: boolean;
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
            level: z.ZodOptional<z.ZodEnum<["warning", "error"]>>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            level?: "error" | "warning" | undefined;
        }, {
            project_path?: string | undefined;
            level?: "error" | "warning" | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            level?: "warning" | "error";
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
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            account: string;
            operation: string;
            cli: {
                installed: boolean;
                version?: string;
                error?: string;
            };
            credentials: {
                available: boolean;
                error?: string;
                project_refs?: string[];
            };
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            sql: z.ZodString;
            project_ref: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sql: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            sql: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            sql: string;
            project_ref?: string;
            project_path?: string;
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
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            account: string;
            operation: string;
            success: boolean;
            project_refs: string[];
            fetched_at: string;
            error?: undefined;
        } | {
            account: string;
            operation: string;
            success: boolean;
            error: any;
            project_refs?: undefined;
            fetched_at?: undefined;
        }>;
    };
};
//# sourceMappingURL=database.d.ts.map