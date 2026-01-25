/**
 * Types Tools
 *
 * Tools for generating TypeScript types from Supabase schema.
 */
import { z } from 'zod';
export declare function createTypesTools(): {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            output_path: z.ZodOptional<z.ZodString>;
            schema: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            output_path?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            output_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            output_path?: string;
            schema?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            write_error: any;
        } | {
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
            output_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            output_path?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            output_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            output_path?: string;
        }) => Promise<{
            account: string;
            operation: string;
            success: boolean;
            error: string;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            error?: undefined;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            write_error: any;
            error?: undefined;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            error?: undefined;
        }>;
    };
};
export declare const typesTools: {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            output_path: z.ZodOptional<z.ZodString>;
            schema: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            output_path?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            schema?: string | undefined;
            output_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            output_path?: string;
            schema?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            write_error: any;
        } | {
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
            output_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            output_path?: string | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            output_path?: string | undefined;
        }>;
        handler: (args: {
            project_path?: string;
            project_ref?: string;
            output_path?: string;
        }) => Promise<{
            account: string;
            operation: string;
            success: boolean;
            error: string;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            error?: undefined;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            output_file: string;
            types_written: boolean;
            write_error: any;
            error?: undefined;
        } | {
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            error?: undefined;
        }>;
    };
};
//# sourceMappingURL=types.d.ts.map