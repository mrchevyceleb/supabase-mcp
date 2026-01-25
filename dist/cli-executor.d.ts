/**
 * CLI Executor
 *
 * Executes Supabase CLI commands with the access token set as an environment variable.
 */
export interface CommandResult {
    success: boolean;
    stdout: string;
    stderr: string;
    exitCode: number;
    command: string;
}
/**
 * Execute a Supabase CLI command
 *
 * @param args - Arguments to pass to the supabase CLI
 * @param cwd - Working directory (defaults to process.cwd())
 * @param timeout - Timeout in milliseconds (default 5 minutes)
 */
export declare function runSupabaseCommand(args: string[], cwd?: string, timeout?: number): Promise<CommandResult>;
/**
 * Execute a streaming Supabase CLI command (for long-running operations)
 *
 * @param args - Arguments to pass to the supabase CLI
 * @param cwd - Working directory
 * @param onOutput - Callback for stdout/stderr output
 */
export declare function runSupabaseCommandStreaming(args: string[], cwd?: string, onOutput?: (data: string, stream: 'stdout' | 'stderr') => void): Promise<CommandResult>;
/**
 * Check if Supabase CLI is installed
 */
export declare function checkSupabaseCli(): Promise<{
    installed: boolean;
    version?: string;
    error?: string;
}>;
//# sourceMappingURL=cli-executor.d.ts.map