/**
 * Credential Client
 *
 * Fetches Supabase credentials from the centralized assistant-mcp server.
 * Credentials are cached in memory for the duration of the process.
 */
interface SupabaseCredentials {
    accessToken: string;
    projectRefs: string[];
    defaultProject?: string;
    fetchedAt: Date;
}
/**
 * Get Supabase credentials (from cache or fetch fresh)
 */
export declare function getSupabaseCredentials(): Promise<SupabaseCredentials>;
/**
 * Get just the access token
 */
export declare function getAccessToken(): Promise<string>;
/**
 * Get project refs associated with this account
 */
export declare function getProjectRefs(): Promise<string[]>;
/**
 * Clear the credentials cache (force refresh on next call)
 */
export declare function clearCredentialsCache(): void;
/**
 * Get the account name from environment
 */
export declare function getAccountName(): string;
export {};
//# sourceMappingURL=credential-client.d.ts.map