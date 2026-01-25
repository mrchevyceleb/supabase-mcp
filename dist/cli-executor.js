/**
 * CLI Executor
 *
 * Executes Supabase CLI commands with the access token set as an environment variable.
 */
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import { getAccessToken } from './credential-client.js';
const execAsync = promisify(exec);
/**
 * Execute a Supabase CLI command
 *
 * @param args - Arguments to pass to the supabase CLI
 * @param cwd - Working directory (defaults to process.cwd())
 * @param timeout - Timeout in milliseconds (default 5 minutes)
 */
export async function runSupabaseCommand(args, cwd, timeout = 5 * 60 * 1000) {
    // Get the access token
    const accessToken = await getAccessToken();
    // Build the command
    const command = `supabase ${args.join(' ')}`;
    const workingDir = cwd || process.cwd();
    console.error(`[supabase-mcp] Running: ${command}`);
    console.error(`[supabase-mcp] Working directory: ${workingDir}`);
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd: workingDir,
            timeout,
            env: {
                ...process.env,
                SUPABASE_ACCESS_TOKEN: accessToken,
            },
            // Increase buffer size for large outputs (like type generation)
            maxBuffer: 10 * 1024 * 1024, // 10MB
        });
        return {
            success: true,
            stdout: stdout.trim(),
            stderr: stderr.trim(),
            exitCode: 0,
            command,
        };
    }
    catch (error) {
        // exec throws on non-zero exit code
        return {
            success: false,
            stdout: error.stdout?.trim() || '',
            stderr: error.stderr?.trim() || error.message,
            exitCode: error.code || 1,
            command,
        };
    }
}
/**
 * Execute a streaming Supabase CLI command (for long-running operations)
 *
 * @param args - Arguments to pass to the supabase CLI
 * @param cwd - Working directory
 * @param onOutput - Callback for stdout/stderr output
 */
export async function runSupabaseCommandStreaming(args, cwd, onOutput) {
    const accessToken = await getAccessToken();
    const workingDir = cwd || process.cwd();
    return new Promise((resolve) => {
        const child = spawn('supabase', args, {
            cwd: workingDir,
            env: {
                ...process.env,
                SUPABASE_ACCESS_TOKEN: accessToken,
            },
            shell: true,
        });
        let stdout = '';
        let stderr = '';
        child.stdout?.on('data', (data) => {
            const str = data.toString();
            stdout += str;
            if (onOutput)
                onOutput(str, 'stdout');
        });
        child.stderr?.on('data', (data) => {
            const str = data.toString();
            stderr += str;
            if (onOutput)
                onOutput(str, 'stderr');
        });
        child.on('close', (code) => {
            resolve({
                success: code === 0,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                exitCode: code || 0,
                command: `supabase ${args.join(' ')}`,
            });
        });
        child.on('error', (error) => {
            resolve({
                success: false,
                stdout: stdout.trim(),
                stderr: error.message,
                exitCode: 1,
                command: `supabase ${args.join(' ')}`,
            });
        });
    });
}
/**
 * Check if Supabase CLI is installed
 */
export async function checkSupabaseCli() {
    try {
        const { stdout } = await execAsync('supabase --version');
        return {
            installed: true,
            version: stdout.trim(),
        };
    }
    catch (error) {
        return {
            installed: false,
            error: error.message,
        };
    }
}
//# sourceMappingURL=cli-executor.js.map