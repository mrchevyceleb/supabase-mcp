/**
 * Functions Tools
 *
 * Tools for managing Supabase Edge Functions.
 */
import { z } from 'zod';
export declare function createFunctionsTools(): {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            no_verify_jwt: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
        }>;
        handler: (args: {
            function_name?: string;
            project_path?: string;
            project_ref?: string;
            no_verify_jwt?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            function_name: string;
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
            function_name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            function_name: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            function_name: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            function_name: string;
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
            function_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            function_name: string;
            project_path?: string | undefined;
        }, {
            function_name: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            function_name: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            function_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
            env_file: z.ZodOptional<z.ZodString>;
            no_verify_jwt: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
            env_file?: string | undefined;
        }, {
            project_path?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
            env_file?: string | undefined;
        }>;
        handler: (args: {
            function_name?: string;
            project_path?: string;
            env_file?: string;
            no_verify_jwt?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            note: string;
        }>;
    };
};
export declare const functionsTools: {
    [x: string]: {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
            no_verify_jwt: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
        }, {
            project_path?: string | undefined;
            project_ref?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
        }>;
        handler: (args: {
            function_name?: string;
            project_path?: string;
            project_ref?: string;
            no_verify_jwt?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            function_name: string;
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
            function_name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
            project_ref: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            function_name: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }, {
            function_name: string;
            project_path?: string | undefined;
            project_ref?: string | undefined;
        }>;
        handler: (args: {
            function_name: string;
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
            function_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodString;
            project_path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            function_name: string;
            project_path?: string | undefined;
        }, {
            function_name: string;
            project_path?: string | undefined;
        }>;
        handler: (args: {
            function_name: string;
            project_path?: string;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            function_name: string;
        }>;
    } | {
        description: string;
        inputSchema: z.ZodObject<{
            function_name: z.ZodOptional<z.ZodString>;
            project_path: z.ZodOptional<z.ZodString>;
            env_file: z.ZodOptional<z.ZodString>;
            no_verify_jwt: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            project_path?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
            env_file?: string | undefined;
        }, {
            project_path?: string | undefined;
            function_name?: string | undefined;
            no_verify_jwt?: boolean | undefined;
            env_file?: string | undefined;
        }>;
        handler: (args: {
            function_name?: string;
            project_path?: string;
            env_file?: string;
            no_verify_jwt?: boolean;
        }) => Promise<{
            success: boolean;
            stdout: string;
            stderr: string;
            exitCode: number;
            command: string;
            account: string;
            operation: string;
            note: string;
        }>;
    };
};
//# sourceMappingURL=functions.d.ts.map